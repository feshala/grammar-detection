/* ============================================================
   16-textview.js
   Original section: 15. TEXT VIEW
   Depends on: $ (12), openOverlay/closeOverlay (15)
   ============================================================ */
function openTextView() {
  const inp = $('input'), overlay = $('textview-overlay'), content = $('textview-content');
  content.textContent = inp.value || '';
  openOverlay(overlay);
  overlay.scrollTop = 0;
}
function closeTextView() { closeOverlay($('textview-overlay')); }
function initTextViewEvents() {
  $('fullview').addEventListener('click', openTextView);
  $('textview-close').addEventListener('click', closeTextView);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && $('textview-overlay').getAttribute('data-open') === 'true') closeTextView();
  });
}