'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = process.env.KOREAN_HELP_SITE;
const source = path.join(root, 'helps/ko');
const pages = fs.readdirSync(source).filter(name => name.endsWith('.md'));

test('Korean help contains index and eleven chapters tied to candidate source', () => {
  assert.equal(pages.length, 12);
  assert.equal(pages.filter(name => /^\d\d-/.test(name)).length, 11);
  const index = fs.readFileSync(path.join(source, 'index.md'), 'utf8');
  assert.match(index, /1\.0\.8/);
  for (const name of pages) {
    const text = fs.readFileSync(path.join(source, name), 'utf8');
    assert.match(text, /\nlang: ko\n/);
    assert.equal((text.match(/^# /gm) || []).length, 1);
    assert.ok(text.includes('## '));
    if (name !== 'index.md') assert.ok(index.includes(`](${name})`), name);
    assert.ok(!/\/privacy-policy\/ko\/|\/terms-of-use\/ko\/|\/ko\/contact\//.test(text));
  }
  assert.match(fs.readFileSync(path.join(source, '02-calendars.md'), 'utf8'), /1899/);
  assert.match(fs.readFileSync(path.join(source, '08-subscriptions.md'), 'utf8'), /RECURRENCE-ID/);
  assert.match(fs.readFileSync(path.join(source, '10-backup-migration.md'), 'utf8'), /약관 동의 기록은 백업 대상/);
});
test('Korean help has production exclusion and fails closed in the generator', () => {
  assert.match(fs.readFileSync(path.join(root, '_config.yml'), 'utf8'), /- helps\/ko/);
  const policy = fs.readFileSync(path.join(root, '_plugins/site_policy.rb'), 'utf8');
  assert.match(policy, /Korean help is not approved/);
  assert.match(policy, /ENV\["JEKYLL_ENV"\] == "development"/);
});
test('production output contains no Korean help or Korean links', { skip: !!output }, () => {
  const site = path.join(root, '_site');
  assert.ok(fs.existsSync(path.join(site, 'sitemap.xml')), 'Build first');
  assert.ok(!fs.existsSync(path.join(site, 'helps/ko')));
  const scan = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? scan(path.join(dir,e.name)) : [path.join(dir,e.name)]);
  for (const file of scan(site).filter(name => /\.(html|xml)$/.test(name))) {
    assert.ok(!fs.readFileSync(file, 'utf8').includes('/helps/ko/'), file);
  }
});
test('local preview renders all Korean chapters and Korean navigation', { skip: !output }, () => {
  const dir = path.join(output || '', 'helps/ko');
  for (const name of pages) {
    const target = name === 'index.md' ? 'index.html' : name.replace(/\.md$/, '.html');
    const html = fs.readFileSync(path.join(dir, target), 'utf8');
    assert.match(html, /<html lang="ko"/);
    assert.match(html, /property="og:locale" content="ko_KR"/);
    assert.match(html, /본문으로 이동/);
    assert.match(html, /바닥글 메뉴/);
    assert.match(html, /hreflang="ko"/);
    assert.match(html, /hreflang="ja"/);
    assert.match(html, /hreflang="en"/);
    assert.match(html, /개인정보 처리방침 \(영어\)/);
    assert.ok(!/\/privacy-policy\/ko\/|\/terms-of-use\/ko\/|\/ko\/contact\//.test(html));
  }
  const en = fs.readFileSync(path.join(output, 'helps/en/index.html'), 'utf8');
  assert.match(en, />한국어<\/a>/);
});
