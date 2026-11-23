const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const source = readFileSync('assets/language-hint.js', 'utf8');

function run(pageLanguage, preferences, available) {
  const links = available.map(hreflang => ({ hreflang, hidden: false }));
  const hint = { hidden: true, querySelectorAll: () => links };
  vm.runInNewContext(source, {
    navigator: { languages: preferences, language: preferences[0] },
    document: { documentElement: { lang: pageLanguage }, querySelector: () => hint },
  });
  return { hint, links };
}
for (const [pageLanguage, preferred, expectedHidden] of [
  ['ja', 'ja-JP', true], ['ja', 'en-US', false], ['ja', 'ko-KR', true],
  ['en', 'ja', false], ['en', 'en-GB', true], ['en', 'he-IL', true],
  ['ja', '', true], ['ja', 'JA-jp', true],
]) {
  test(`${pageLanguage} page, ${preferred || 'unknown'} browser language`, () => {
    const { hint } = run(pageLanguage, [preferred], [pageLanguage === 'ja' ? 'en' : 'ja']);
    assert.equal(hint.hidden, expectedHidden);
  });
}
test('direct article access has no hint and no side effects', () => {
  vm.runInNewContext(source, { document: { querySelector: () => null } });
});
test('first preference takes priority over secondary languages', () => {
  assert.equal(run('ja', ['en-US', 'ja-JP'], ['en']).hint.hidden, false);
});
test('Korean recommendation requires an available Korean translation', () => {
  const {hint, links} = run('en', ['ko-KR'], ['ja', 'ko']);
  assert.equal(hint.hidden, false);
  assert.deepEqual(links.map(link => link.hidden), [true, false]);
  assert.equal(run('en', ['ko-KR'], ['ja']).hint.hidden, true);
});
test('Korean page recommends only the preferred available translation', () => {
  assert.equal(run('ko', ['ko-KR'], ['ja', 'en']).hint.hidden, true);
  const {hint, links} = run('ko', ['ja-JP'], ['ja', 'en']);
  assert.equal(hint.hidden, false);
  assert.deepEqual(links.map(link => link.hidden), [false, true]);
});
