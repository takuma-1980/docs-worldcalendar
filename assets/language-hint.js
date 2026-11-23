(() => {
  const hint = document.querySelector('[data-language-hint]');
  if (!hint) return;
  const preferred = (navigator.languages?.[0] || navigator.language || '').toLowerCase().split('-')[0];
  if (!preferred) return;
  const target = ['ja', 'en', 'ko'].includes(preferred) ? preferred : 'en';
  const links = [...hint.querySelectorAll('a[hreflang]')];
  let available = false;
  for (const link of links) {
    link.hidden = link.hreflang !== target;
    if (!link.hidden) available = true;
  }
  hint.hidden = document.documentElement.lang === target || !available;
})();
