/* ============================================================
   12-state.js
   Original section: 11. UTIL + STATE
   Depends on: POS_COLORS, PHRASE_COLORS, TENSE_COLORS (11)
   ============================================================ */
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const $ = id => document.getElementById(id);
const STATE = {tokens:[], spans:[], structure:{}, grammar:[], issues:[], mode:'pos', selected:null};
const EXPAND_STATE = new Map();

function colorForToken(idx, mode) {
  const {tokens, spans, grammar} = STATE;
  if (mode === 'pos') return POS_COLORS[tokens[idx].tag] || null;
  if (mode === 'phrase') { const s = spans.find(sp => idx >= sp.start && idx <= sp.end); return s ? PHRASE_COLORS[s.type] : null; }
  if (mode === 'grammar') { const g = grammar.find(g => idx >= g.span.start && idx <= g.span.end); return g ? (TENSE_COLORS[g.name] || '#e0e0e0') : null; }
  return null;
}