const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const source = readFileSync('assets/language-hint.js', 'utf8');

for (const [pageLanguage, preferred, expectedHidden] of [
  ['ja', 'ja-JP', true], ['ja', 'en-US', false], ['ja', 'ko-KR', false],
  ['en', 'ja', false], ['en', 'en-GB', true], ['en', 'he-IL', true],
  ['ja', '', true], ['ja', 'JA-jp', true],
]) {
  test(`${pageLanguage} page, ${preferred || 'unknown'} browser language`, () => {
    const hint = { hidden: true };
    // No location/storage API: an attempted redirect or persistence would fail.
    vm.runInNewContext(source, {
      navigator: { languages: [preferred], language: preferred },
      document: { documentElement: { lang: pageLanguage }, querySelector: () => hint },
    });
    assert.equal(hint.hidden, expectedHidden);
  });
}
test('direct article access has no hint and no side effects', () => {
  vm.runInNewContext(source, { document: { querySelector: () => null } });
});
test('first preference takes priority over secondary languages', () => {
  const hint = { hidden: true };
  vm.runInNewContext(source, {
    navigator: { languages: ['en-US', 'ja-JP'], language: 'ja-JP' },
    document: { documentElement: { lang: 'ja' }, querySelector: () => hint },
  });
  assert.equal(hint.hidden, false);
});
