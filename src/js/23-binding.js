/* ============================================================
   23-binding.js
   Original section: 22. MAIN EVENT BINDING
   Depends on: $, STATE, EXPAND_STATE (12);
               analyze (17); autoGrowInput (14);
               renderSentence, renderLegend, renderDetail (13)
   ============================================================ */
const inputEl = $('input');
$('go').addEventListener('click', () => analyze());
$('reset').addEventListener('click', () => {
  inputEl.value = '';
  autoGrowInput();
  Object.assign(STATE, {tokens:[], spans:[], structure:{}, grammar:[], issues:[], selected:null});
  EXPAND_STATE.clear();
  $('output').innerHTML = '';
  $('legend').innerHTML = '';
  $('status').hidden = true;
  $('summary').innerHTML = `<h3>Ringkasan Struktur</h3><div class="muted">—</div>`;
  $('detail').innerHTML = `<h3>Detail Kata</h3><div class="muted">Klik sebuah kata atau frasa di kalimat di atas.</div>`;
  $('validation').innerHTML = `<h3>Pemeriksaan Grammar</h3><div class="muted">—</div>`;
  $('patterns').innerHTML = `<h3>Pola Grammar yang Terdeteksi</h3><div class="muted">—</div>`;
});
inputEl.addEventListener('input', autoGrowInput);
inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); analyze(); }
});
$('tabs').addEventListener('click', e => {
  const btn = e.target.closest('button[data-mode]');
  if (!btn) return;
  document.querySelectorAll('#tabs button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  STATE.mode = btn.dataset.mode;
  renderSentence();
  renderLegend();
});
$('output').addEventListener('click', e => {
  const el = e.target.closest('.tok');
  if (!el) return;
  STATE.selected = parseInt(el.dataset.idx, 10);
  renderSentence();
  renderDetail();
});