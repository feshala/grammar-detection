/* ============================================================
   15-overlay.js
   Original section: 14. OVERLAY HELPER
   ============================================================ */
function openOverlay(el) {
  if (!el) return;
  el.hidden = false;
  void el.offsetWidth;
  el.setAttribute('data-open', 'true');
}
function closeOverlay(el) {
  if (!el) return;
  el.setAttribute('data-open', 'false');
  setTimeout(() => { if (el.getAttribute('data-open') === 'false') el.hidden = true; }, 180);
}