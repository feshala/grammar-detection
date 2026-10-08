/* ============================================================
   14-autogrow.js
   Original section: 13. TEXTAREA AUTO-GROW
   ============================================================ */
function autoGrowInput() {
  const el = $('input');
  if (!el) return;
  const prev = {h: el.style.height, o: el.style.overflowY, t: el.style.transition};
  el.style.transition = 'none';
  el.style.height = 'auto';
  el.style.overflowY = 'hidden';
  void el.offsetHeight;
  const natural = el.scrollHeight;
  el.style.transition = prev.t;
  el.style.height = prev.h;
  el.style.overflowY = prev.o;
  const target = Math.max(48, Math.min(natural, 420));
  el.style.height = target + 'px';
  el.style.overflowY = natural > 420 ? 'auto' : 'hidden';
}