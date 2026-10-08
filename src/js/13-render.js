/* ============================================================
   13-render.js
   Original section: 12. RENDER FUNCTIONS
   Depends on: STATE, colorForToken, $ (12), TAG_LABEL (10),
               PHRASE_TO_GLOSSARY, FORM_TO_GLOSSARY, TAG_TO_GLOSSARY (18),
               explainWord, wordFunction (10)
   ============================================================ */
function renderSentence() {
  const {tokens, mode} = STATE;
  $('output').innerHTML = tokens.map((t, i) => {
    const bg = colorForToken(i, mode);
    const style = bg ? `style="background:${bg}"` : '';
    const cls = ['tok'];
    if (t.contEnd && !t.contStart) cls.push('cont-mid');
    if (!t.contEnd && t.contStart) cls.push('cont-mid');
    if (STATE.selected === i) cls.push('selected');
    return `<span class="${cls.join(' ')}" data-idx="${i}" ${style} title="${esc((TAG_LABEL[t.tag]||t.tag) + (t.lemma ? ' · '+t.lemma : ''))}">${esc(t.text)}</span>`;
  }).join(' ');
}

function renderLegend() {
  const mode = STATE.mode;
  let entries = [];
  if (mode === 'pos') entries = [...new Set(STATE.tokens.filter(t => t.tag !== 'PUNCT').map(t => t.tag))].map(tag => ({label:TAG_LABEL[tag]||tag, color:POS_COLORS[tag]||'#eee'}));
  else if (mode === 'phrase') entries = [...new Set(STATE.spans.map(s => s.type))].map(type => ({label:type, color:PHRASE_COLORS[type]||'#eee'}));
  else { const m = new Map(); STATE.grammar.forEach(g => m.set(g.name, TENSE_COLORS[g.name]||'#eee')); entries = [...m].map(([label, color]) => ({label, color})); }
  $('legend').innerHTML = entries.map(e => `<span class="legend-item"><span class="swatch" style="background:${e.color}"></span>${esc(e.label)}</span>`).join('');
}

function renderExpandable(containerId, items, renderItem, initial = 3, emptyHtml = '') {
  const el = $(containerId);
  if (!el) return;
  if (!items.length) { el.innerHTML = emptyHtml || '<div class="muted">—</div>'; return; }
  const expanded = EXPAND_STATE.get(containerId) === true;
  const shown = expanded ? items : items.slice(0, initial);
  const hidden = items.length - Math.min(initial, items.length);
  let html = shown.map(renderItem).join('');
  if (hidden > 0) html += `<div><button class="view-more-btn" data-expand="${containerId}" aria-expanded="${expanded}">${expanded ? 'Show less' : `Show more (${hidden} lagi)`}</button></div>`;
  el.innerHTML = html;
}

const glossLink = (id, text) => id ? `<button type="button" class="gloss-link" data-gloss="${esc(id)}">${esc(text)}</button>` : esc(text);

function renderSummary() {
  const s = STATE.structure, tokens = STATE.tokens;
  const txt = span => span ? tokens.slice(span.start, span.end + 1).map(t => t.text).join(' ') : '—';
  const rows = [['Pelaku (Subject)', txt(s.subject), s.subject ? 'subject' : null]];
  if (s.vp) {
    rows.push(['Predikat', txt(s.vp), 'predicate']);
    const vpTokens = tokens.slice(s.vp.start, s.vp.end + 1).filter(t => /^VB/.test(t.tag));
    const main = vpTokens[vpTokens.length - 1];
    rows.push(['Kata kerja inti', main ? `${main.text} (${main.lemma || main.text})` : '—', 'main-verb']);
    const auxes = vpTokens.slice(0, -1).map(t => t.text).join(' ');
    if (auxes) rows.push(['Kata bantu', auxes, 'auxiliary-verb']);
  }
  rows.push(['Objek / Pelengkap', txt(s.object), s.object ? 'direct-object' : null]);
  if (s.adverbials?.length) rows.push(['Keterangan', s.adverbials.map(txt).join(' · '), 'adverbial']);
  if (STATE.grammar.length) rows.push(['Waktu (Tense)', STATE.grammar.map(g => g.name).join(' / '), STATE.grammar.length === 1 ? STATE.grammar[0].glossId : null]);
  const isQ = tokens.some(t => t.text === '?');
  const isImp = !s.subject && s.vp && s.vp.start === 0;
  rows.push(['Jenis kalimat', isQ ? 'Kalimat tanya' : isImp ? 'Kalimat perintah' : 'Kalimat pernyataan', isQ ? 'interrogative' : null]);
  $('summary').innerHTML = `<h3>Ringkasan Struktur</h3><dl class="kv">${rows.map(([k,v,gid]) => `<dt>${gid ? glossLink(gid, k) : esc(k)}</dt><dd>${esc(v||'—')}</dd>`).join('')}</dl>`;
}

function renderDetail() {
  const el = $('detail');
  if (STATE.selected == null) { el.innerHTML = `<h3>Detail Kata</h3><div class="muted">Klik sebuah kata atau frasa di kalimat di atas.</div>`; return; }
  const idx = STATE.selected;
  const info = explainWord(idx, STATE.tokens, STATE.spans, STATE.structure);
  const wf = wordFunction(idx, STATE.tokens, STATE.spans, STATE.structure);
  const tagGloss = TAG_TO_GLOSSARY[info.tag];
  const tenseGloss = wf.tense ? wf.tense.glossId : null;
  let html = `<h3>Detail Kata</h3><dl class="kv">`;
  html += `<dt>Kata</dt><dd><strong>${esc(info.text)}</strong></dd>`;
  html += `<dt>Jenis kata</dt><dd>${tagGloss ? glossLink(tagGloss, info.label) : esc(info.label)}</dd>`;
  if (info.lemma) html += `<dt>Bentuk dasar</dt><dd>${esc(info.lemma)}</dd>`;
  if (info.form) html += `<dt>Bentuk kata kerja</dt><dd>${glossLink(FORM_TO_GLOSSARY[info.form], info.form)}</dd>`;
  if (info.aux) html += `<dt>Peran</dt><dd>${glossLink('auxiliary-verb', 'Kata bantu')}</dd>`;
  if (wf.phraseRole) html += `<dt>Fungsi dalam kalimat</dt><dd>${glossLink(wf.phraseGloss, wf.phraseRole)}</dd>`;
  if (wf.tense) html += `<dt>Waktu (Tense)</dt><dd>${glossLink(tenseGloss, wf.tense.name)} — <code>${esc(wf.tense.formula)}</code></dd>`;
  html += `</dl><p class="expl">${esc(info.reason)}</p>`;
  if (wf.span) {
    const pg = PHRASE_TO_GLOSSARY[wf.span.type];
    html += `<p class="expl"><strong>Kelompok kata:</strong> ${pg ? glossLink(pg, wf.span.label) : esc(wf.span.label)} (kata ${wf.span.start+1}–${wf.span.end+1})</p>`;
  }
  if (info.ambiguous?.length) html += `<p class="expl"><strong>Bisa juga:</strong> dalam konteks lain, kata ini bisa jadi ${info.ambiguous.join(' atau ')}.</p>`;
  el.innerHTML = html;
}

function renderValidation() {
  if (!STATE.issues.length) { $('validation').innerHTML = `<h3>Pemeriksaan Grammar</h3><div class="muted">—</div>`; return; }
  renderExpandable('validation', STATE.issues, i => {
    const btn = i.glossId ? ` <button type="button" class="gloss-link" data-gloss="${esc(i.glossId)}" style="font-size:11.5px">Pelajari aturannya</button>` : '';
    return `<div class="issue ${i.level}">${esc(i.msg)}${btn}</div>`;
  });
  $('validation').innerHTML = `<h3>Pemeriksaan Grammar</h3>` + $('validation').innerHTML;
}

function renderPatterns() {
  if (!STATE.grammar.length) { $('patterns').innerHTML = `<h3>Pola Grammar yang Terdeteksi</h3><div class="muted">Belum ada pola yang bisa dikenali dengan pasti.</div>`; return; }
  renderExpandable('patterns', STATE.grammar, g => {
    const span = STATE.tokens.slice(g.span.start, g.span.end + 1).map(t => t.text).join(' ');
    const title = g.glossId ? `<button type="button" class="gloss-link" data-gloss="${esc(g.glossId)}" style="font-weight:600;font-size:14px">${esc(g.name)}</button>` : `<strong>${esc(g.name)}</strong>`;
    return `<div class="issue info">${title} — <code>${esc(g.formula)}</code><br><span class="muted">Kata yang mengisi: ${esc(span)}</span></div>`;
  });
  $('patterns').innerHTML = `<h3>Pola Grammar yang Terdeteksi</h3>` + $('patterns').innerHTML;
}

function render() {
  renderSentence();
  renderLegend();
  renderSummary();
  renderDetail();
  renderValidation();
  renderPatterns();
}