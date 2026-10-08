/* ============================================================
   17-analyze.js
   Original section: 16. ANALYZE
   Depends on: STATE, $ (12); tagger (05); chunker (06);
               structure (07); tense (08); validator (09); render (13)
   ============================================================ */
let _analyzing = false;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const nextPaint = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
const idleYield = timeout => new Promise(r => {
  if (typeof requestIdleCallback === 'function') requestIdleCallback(() => r(), {timeout});
  else setTimeout(r, 0);
});
function isLowEndDevice() {
  try {
    const conn = navigator.connection || {};
    if (conn.saveData === true) return true;
    const cores = navigator.hardwareConcurrency;
    const mem = navigator.deviceMemory;
    if (cores === undefined && mem === undefined) return false;
    const lowCores = cores !== undefined && cores <= 4;
    const lowMem = mem !== undefined && mem <= 4;
    return lowCores || lowMem;
  } catch { return false; }
}

async function analyze(opts = {}) {
  const silent = opts.silent === true;
  if (_analyzing) return;
  _analyzing = true;

  const goBtn = $('go'), pageHome = $('page-home'), loadingEl = $('loading'), statusEl = $('status');
  if (goBtn) goBtn.disabled = true;
  if (!silent) {
    if (statusEl) statusEl.hidden = true;
    if (loadingEl) loadingEl.hidden = false;
    if (pageHome) pageHome.classList.add('analyzing');
  }

  const startedAt = performance.now();
  const MIN_LOADING_MS = 550;

  try {
    await nextPaint();
    if (isLowEndDevice()) { await idleYield(300); await sleep(180); }
    else { await idleYield(120); }

    const text = $('input').value;

    const tokens = tokenize(text);
    await nextPaint();
    tagAll(tokens);
    await nextPaint();
    const spans = chunk(tokens);
    const grammar = detectGrammar(tokens, spans);
    const clauses = splitClauses(tokens);
    const structures = clauses.map(c => {
      const s = analyzeStructure(tokens, spans, c.start, c.end);
      s.grammar = grammar.filter(g => g.span.start >= c.start && g.span.end <= c.end);
      return s;
    });
    await nextPaint();
    const issues = validate(tokens, structures);
    let mainClauseIdx = clauses.findIndex(c => {
      const ft = tokens[c.start];
      return ft && !(ft.tag === 'IN' && CLAUSE_SUBORDINATORS.has(ft.text.toLowerCase()));
    });
    if (mainClauseIdx < 0) mainClauseIdx = 0;
    const structure = structures[mainClauseIdx] || {vps:[], subject:null, object:null, adverbials:[]};
    structure.grammar = grammar;

    STATE.tokens = tokens;
    STATE.spans = spans;
    STATE.structure = structure;
    STATE.grammar = grammar;
    STATE.issues = issues;
    STATE.selected = null;

    if (!silent) {
      const elapsed = performance.now() - startedAt;
      if (elapsed < MIN_LOADING_MS) await sleep(MIN_LOADING_MS - elapsed);
    }
    render();
  } catch (e) {
    console.error(e);
    if (statusEl) { statusEl.textContent = 'Terjadi kesalahan saat menganalisis kalimat. Coba lagi.'; statusEl.hidden = false; }
  } finally {
    if (pageHome) pageHome.classList.remove('analyzing');
    if (loadingEl) loadingEl.hidden = true;
    _analyzing = false;
    if (goBtn) goBtn.disabled = false;
  }
}