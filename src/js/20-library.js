/* ============================================================
   20-library.js
   Original section: 19. LIBRARY FUNCTIONS
   Depends on: $, esc (12); GRAMMAR_GLOSSARY, GLOSSARY_CATEGORIES (19);
               openOverlay, closeOverlay (15)
   ============================================================ */
const LIB_STATE = {search:'', category:'all', selectedId:null, listExpanded:false, relatedExpanded:false};
const LIB_INITIAL_LIST = 8;
let _lastFocusedBeforeLib = null;
let _libSearchTimer = null;

const getGlossaryEntries = () => Object.values(GRAMMAR_GLOSSARY);
const getCategoryName = catId => {
  const c = GLOSSARY_CATEGORIES.find(c => c.id === catId);
  return c ? c.name : catId;
};

function filterGlossary() {
  const q = LIB_STATE.search.trim().toLowerCase();
  const cat = LIB_STATE.category;
  return getGlossaryEntries().filter(e => {
    if (cat !== 'all' && e.category !== cat) return false;
    if (!q) return true;
    const hay = [e.name, e.abbr||'', e.definition, e.simple||'', e.fungsi||'', e.identifikasi||'', e.rumus||'', ...(e.contoh||[]).map(c => c.kalimat + ' ' + c.catatan)].join(' ').toLowerCase();
    return hay.includes(q);
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function renderGlossaryCategories() {
  const cats = [{id:'all', name:'Semua'}, ...GLOSSARY_CATEGORIES];
  $('lib-cats').innerHTML = cats.map(c => {
    const active = LIB_STATE.category === c.id ? ' active' : '';
    return `<button type="button" class="lib-cat${active}" data-cat="${esc(c.id)}" role="tab" aria-selected="${LIB_STATE.category === c.id}">${esc(c.name)}</button>`;
  }).join('');
}

function renderGlossaryList() {
  const list = $('lib-list');
  const results = filterGlossary();
  if (!results.length) {
    list.innerHTML = `<div class="lib-empty"><strong>Tidak ada istilah yang cocok.</strong>Coba kata kunci lain, atau ubah filter kategori di atas.</div>`;
    return;
  }
  const expanded = LIB_STATE.listExpanded;
  const shown = expanded ? results : results.slice(0, LIB_INITIAL_LIST);
  const hidden = results.length - Math.min(LIB_INITIAL_LIST, results.length);
  let html = shown.map(e => `
    <button type="button" class="lib-item" data-term="${esc(e.id)}">
      <div class="li-top">
        <span class="li-name">${esc(e.name)}</span>
        ${e.abbr ? `<span class="li-abbr">${esc(e.abbr)}</span>` : ''}
        <span class="li-cat">${esc(getCategoryName(e.category))}</span>
      </div>
      <div class="li-def">${esc(e.simple || e.definition)}</div>
    </button>`).join('');
  if (hidden > 0) {
    html += `<div style="text-align:center"><button class="view-more-btn" data-lib-expand="list">${expanded ? 'Show less' : `Show more (${hidden} lagi)`}</button></div>`;
  }
  list.innerHTML = html;
}

function renderGlossaryDetail(termId) {
  const e = GRAMMAR_GLOSSARY[termId];
  const detail = $('lib-detail');
  if (!e) { detail.innerHTML = `<div class="lib-empty"><strong>Istilah tidak ditemukan.</strong></div>`; return; }
  const related = (e.related||[]).map(id => GRAMMAR_GLOSSARY[id]).filter(Boolean);
  const relLimit = 5, relExp = LIB_STATE.relatedExpanded;
  const relShown = relExp ? related : related.slice(0, relLimit);
  const relHidden = related.length - Math.min(relLimit, related.length);

  let html = `<h3>${esc(e.name)}${e.abbr ? ` <span class="ld-abbr">${esc(e.abbr)}</span>` : ''} <span class="ld-cat">${esc(getCategoryName(e.category))}</span></h3>`;
  if (e.simple) {
    html += `<div class="ld-simple"><span class="ld-simple-icon" aria-hidden="true">💡</span><div><strong>Intinya:</strong> ${esc(e.simple)}</div></div>`;
  }
  html += `<div class="ld-section"><h4>Apa itu?</h4><p>${esc(e.definition)}</p></div>`;
  if (e.fungsi) html += `<div class="ld-section"><h4>Untuk apa?</h4><p>${esc(e.fungsi)}</p></div>`;
  if (e.identifikasi) html += `<div class="ld-section"><h4>Cara mengenalinya</h4><p>${esc(e.identifikasi)}</p></div>`;
  if (e.rumus) html += `<div class="ld-section"><h4>Polanya</h4><div class="ld-formula">${esc(e.rumus)}</div></div>`;
  if (e.contoh?.length) {
    html += `<div class="ld-section"><h4>Contoh</h4>`;
    e.contoh.forEach(c => html += `<div class="ld-ex"><div class="ex-sent">${c.kalimat}</div><div class="ex-note">${esc(c.catatan)}</div></div>`);
    html += `</div>`;
  }
  if (e.perbedaan) html += `<div class="ld-section"><h4>Bedanya dengan istilah lain</h4><p>${esc(e.perbedaan)}</p></div>`;
  if (related.length) {
    html += `<div class="ld-section"><h4>Istilah terkait</h4><div class="ld-related">`;
    html += relShown.map(r => `<button type="button" class="lib-related-btn" data-term="${esc(r.id)}">${esc(r.name)}</button>`).join('');
    html += `</div>`;
    if (relHidden > 0) html += `<div style="margin-top:8px"><button class="view-more-btn" data-lib-expand="related">${relExp ? 'Show less' : `Show more (${relHidden} lagi)`}</button></div>`;
    html += `</div>`;
  }
  detail.innerHTML = html;
}

function showGlossaryListView() {
  $('lib-list-view').hidden = false;
  $('lib-detail-view').hidden = true;
  LIB_STATE.selectedId = null;
}
function showGlossaryDetailView(termId) {
  if (!GRAMMAR_GLOSSARY[termId]) return;
  LIB_STATE.selectedId = termId;
  LIB_STATE.relatedExpanded = false;
  $('lib-list-view').hidden = true;
  $('lib-detail-view').hidden = false;
  renderGlossaryDetail(termId);
  $('lib-detail-view').scrollTop = 0;
}

function openGrammarLibrary(termId) {
  _lastFocusedBeforeLib = document.activeElement;
  const overlay = $('lib-overlay');
  renderGlossaryCategories();
  renderGlossaryList();
  if (termId && GRAMMAR_GLOSSARY[termId]) showGlossaryDetailView(termId);
  else showGlossaryListView();
  openOverlay(overlay);
  setTimeout(() => { const s = $('lib-search'); if (s) s.focus(); }, 50);
}
function closeGrammarLibrary() {
  closeOverlay($('lib-overlay'));
  if (_lastFocusedBeforeLib && typeof _lastFocusedBeforeLib.focus === 'function') {
    try { _lastFocusedBeforeLib.focus(); } catch (_) {}
  }
}
function openGlossaryTerm(termId) {
  const overlay = $('lib-overlay');
  if (overlay.getAttribute('data-open') !== 'true') openGrammarLibrary(termId);
  else showGlossaryDetailView(termId);
}
function searchGlossary(q) {
  LIB_STATE.search = q;
  LIB_STATE.listExpanded = false;
  renderGlossaryList();
  if (LIB_STATE.selectedId && q.trim()) showGlossaryListView();
}
function debouncedSearchGlossary(q) {
  clearTimeout(_libSearchTimer);
  _libSearchTimer = setTimeout(() => searchGlossary(q), 120);
}

function initLibraryEvents() {
  $('lib-close').addEventListener('click', closeGrammarLibrary);
  $('lib-overlay').addEventListener('mousedown', e => {
    if (e.target === $('lib-overlay')) closeGrammarLibrary();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && $('lib-overlay').getAttribute('data-open') === 'true') closeGrammarLibrary();
  });
  $('lib-search').addEventListener('input', e => debouncedSearchGlossary(e.target.value));
  $('lib-cats').addEventListener('click', e => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    LIB_STATE.category = btn.dataset.cat;
    LIB_STATE.listExpanded = false;
    renderGlossaryCategories();
    renderGlossaryList();
    showGlossaryListView();
  });
  $('lib-list').addEventListener('click', e => {
    const expandBtn = e.target.closest('[data-lib-expand="list"]');
    if (expandBtn) { LIB_STATE.listExpanded = !LIB_STATE.listExpanded; renderGlossaryList(); return; }
    const item = e.target.closest('[data-term]');
    if (item) showGlossaryDetailView(item.dataset.term);
  });
  $('lib-detail-view').addEventListener('click', e => {
    if (e.target.closest('#lib-back')) { showGlossaryListView(); return; }
    const relExpand = e.target.closest('[data-lib-expand="related"]');
    if (relExpand) {
      LIB_STATE.relatedExpanded = !LIB_STATE.relatedExpanded;
      if (LIB_STATE.selectedId) renderGlossaryDetail(LIB_STATE.selectedId);
      return;
    }
    const item = e.target.closest('[data-term]');
    if (item) showGlossaryDetailView(item.dataset.term);
  });
}