'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const drafts = path.join(root, 'docs/privacy-policy/korea-phase3/drafts');
const output = process.env.KOREAN_DRAFT_SITE || path.join(root, '_site');

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? files(name) : [name];
  });
}

test('Korean drafts do not appear in production output, sitemap or public links', () => {
  assert.ok(fs.existsSync(path.join(output, 'sitemap.xml')), 'Build Jekyll before testing');
  for (const route of ['docs', 'privacy-policy/ko', 'terms-of-use/ko', 'ko/contact']) {
    assert.equal(fs.existsSync(path.join(output, route)), false, route);
  }
  const markers = ['korea-phase3', '/privacy-policy/ko/', '/terms-of-use/ko/', '/ko/contact/',
    'inquiry-ko-draft-2026-11-23-v1', '비공개 검토용 초안'];
  for (const file of files(output).filter(name => /\.(html|xml|txt|md)$/i.test(name))) {
    const text = fs.readFileSync(file, 'utf8');
    for (const marker of markers) assert.ok(!text.includes(marker), `${file}: ${marker}`);
    assert.ok(!/hreflang=["']ko(?:-KR)?["']/i.test(text), file);
  }
});

test('contact draft cannot compose or send email even when opened locally', () => {
  const html = fs.readFileSync(path.join(drafts, 'ko/contact/index.html'), 'utf8');
  assert.ok(!/<(?:script|form)\b|mailto:|data-email\s*=|\bon\w+\s*=/i.test(html));
  const controls = html.match(/<(?:input|button)\b[^>]*>/gi) || [];
  assert.ok(controls.length >= 2);
  for (const tag of controls) {
    assert.match(tag, /\bdisabled\b/);
    assert.ok(!/\bchecked\b/.test(tag));
  }
  for (const attr of ['data-inquiry-consent', 'data-inquiry-agree', 'data-inquiry-compose', 'data-inquiry-template']) {
    assert.ok(html.includes(attr));
  }
  const statement = html.match(/<span>([^<]+)<\/span>/)[1];
  assert.ok(html.includes(`${statement}\n설명 버전: inquiry-ko-draft-2026-11-23-v1`));
});

test('relative links in all three drafts resolve within the workspace', () => {
  for (const file of files(drafts)) {
    const text = fs.readFileSync(file, 'utf8');
    const links = [...text.matchAll(/(?:href=["']([^"']+)["']|\]\(([^)]+)\))/g)];
    for (const match of links) {
      const link = match[1] || match[2];
      if (/^(?:https?:|#)/.test(link)) continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(file), link.split('#')[0])), `${file}: ${link}`);
    }
  }
});
