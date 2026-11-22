const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const source = readFileSync('assets/inquiry-consent.js', 'utf8');

function setup(body, subject) {
  const events = {};
  const pageEvents = {};
  const destinations = [];
  const checkbox = { checked: true, addEventListener: (name, fn) => { events[name] = fn; } };
  const button = { disabled: false, addEventListener: (name, fn) => { events[name] = fn; } };
  const template = { textContent: body };
  const panel = {
    dataset: { email: 'worldcalendar-app@googlegroups.com', subject },
    querySelector: selector => ({
      '[data-inquiry-agree]': checkbox,
      '[data-inquiry-compose]': button,
      '[data-inquiry-template]': template,
    })[selector],
  };
  // No fetch, storage, cookie, beacon or email-send API is available here.
  vm.runInNewContext(source, {
    document: { querySelector: () => panel },
    window: {
      addEventListener: (name, fn) => { pageEvents[name] = fn; },
      location: { assign: url => destinations.push(url) },
    },
  });
  return { checkbox, button, events, pageEvents, destinations };
}

test('restored checkbox state is cleared and an unconsented click cannot open email', () => {
  const state = setup('Consent', 'Inquiry');
  assert.equal(state.checkbox.checked, false);
  assert.equal(state.button.disabled, true);
  state.events.click();
  assert.deepEqual(state.destinations, []);
});

for (const [body, subject] of [
  ['同意します。\n説明の版: inquiry-overseas-2026-11-22-draft-1\n内容：A & B + %', 'WorldCalendarへのお問い合わせ'],
  ['I consent.\nNotice version: inquiry-overseas-2026-11-22-draft-1\nDetails: A & B + %', 'WorldCalendar inquiry'],
]) {
  test(`explicit consent composes an encoded draft: ${subject}`, () => {
    const state = setup(body, subject);
    state.checkbox.checked = true;
    state.events.change();
    assert.equal(state.button.disabled, false);
    assert.deepEqual(state.destinations, []);
    state.events.click();
    const url = new URL(state.destinations[0]);
    assert.equal(url.protocol, 'mailto:');
    assert.equal(url.pathname, 'worldcalendar-app@googlegroups.com');
    assert.equal(url.searchParams.get('subject'), subject);
    assert.equal(url.searchParams.get('body'), body);
  });
}

test('withdrawing the checkbox immediately disables composition', () => {
  const state = setup('Consent', 'Inquiry');
  state.checkbox.checked = true;
  state.events.change();
  state.checkbox.checked = false;
  state.events.change();
  assert.equal(state.button.disabled, true);
  state.events.click();
  assert.deepEqual(state.destinations, []);
});

test('back/forward restoration requires a fresh choice', () => {
  const state = setup('Consent', 'Inquiry');
  state.checkbox.checked = true;
  state.events.change();
  state.pageEvents.pageshow();
  assert.equal(state.checkbox.checked, false);
  assert.equal(state.button.disabled, true);
});

test('other pages are left untouched', () => {
  vm.runInNewContext(source, { document: { querySelector: () => null } });
});

// Exercise the actual generated bilingual content, rather than sample strings only.
for (const [route, lang, consentMarker] of [
  ['contact/index.html', 'ja', '同意します。'],
  ['en/contact/index.html', 'en', 'I consent to'],
]) {
  test(`built ${lang} notice keeps consent gating and the manual fallback`, () => {
    const html = readFileSync(`_site/${route}`, 'utf8');
    assert.match(html, /data-inquiry-compose disabled/);
    assert.match(html, /<noscript><p>[^<]+<\/p><\/noscript>/);
    assert.doesNotMatch(html, /href="mailto:/);
    const template = html.match(/<pre data-inquiry-template>([\s\S]*?)<\/pre>/)[1];
    assert.ok(template.includes(consentMarker));
    const version = readFileSync('_includes/inquiry-consent.html', 'utf8').match(/assign inquiry_version = '([^']+)'/)[1];
    assert.ok(template.includes(version));
    assert.ok(template.includes(`https://www.worldcalendar.xyz/${lang === 'en' ? 'en/' : ''}contact/`));
    const state = setup(template, lang === 'ja' ? 'お問い合わせ' : 'Inquiry');
    state.events.click();
    assert.deepEqual(state.destinations, []);
    state.checkbox.checked = true;
    state.events.change();
    state.events.click();
    assert.equal(new URL(state.destinations[0]).searchParams.get('body'), template.trim());
  });
}
