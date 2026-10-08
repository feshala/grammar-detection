/* ============================================================
   22-handlers.js
   Original section: 21. GLOBAL HANDLERS
   Depends on: openGlossaryTerm (20); EXPAND_STATE (12);
               renderValidation, renderPatterns (13)
   ============================================================ */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-gloss]');
  if (!el) return;
  e.preventDefault();
  openGlossaryTerm(el.dataset.gloss);
});
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-expand]');
  if (!btn) return;
  const id = btn.dataset.expand;
  EXPAND_STATE.set(id, !EXPAND_STATE.get(id));
  if (id === 'validation') renderValidation();
  else if (id === 'patterns') renderPatterns();
});