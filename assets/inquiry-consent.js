(() => {
  'use strict';
  const panel = document.querySelector('[data-inquiry-consent]');
  if (!panel) return;
  const checkbox = panel.querySelector('[data-inquiry-agree]');
  const button = panel.querySelector('[data-inquiry-compose]');
  const template = panel.querySelector('[data-inquiry-template]');
  const sync = () => { button.disabled = !checkbox.checked; };
  const reset = () => { checkbox.checked = false; sync(); };
  reset();
  checkbox.addEventListener('change', sync);
  // Do not restore a previous choice when returning from the mail application.
  window.addEventListener('pageshow', reset);
  button.addEventListener('click', () => {
    if (!checkbox.checked) return;
    const query = 'subject=' + encodeURIComponent(panel.dataset.subject) +
      '&body=' + encodeURIComponent(template.textContent.trim());
    window.location.assign('mailto:' + panel.dataset.email + '?' + query);
  });
})();
