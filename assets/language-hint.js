(() => {
  const hint = document.querySelector('[data-language-hint]');
  if (!hint) return;
  const preferred = (navigator.languages?.[0] || navigator.language || '').toLowerCase();
  if (!preferred) return;
  const wantsJapanese = preferred.split('-')[0] === 'ja';
  hint.hidden = document.documentElement.lang === 'ja' ? wantsJapanese : !wantsJapanese;
})();
