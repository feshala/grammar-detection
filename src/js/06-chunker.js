/* ============================================================
   06-chunker.js
   Original section: 5. CHUNKER
   FROZEN: do not modify without an explicit wave goal.
   ============================================================ */
function detectNP(tokens, i) {
  let j = i, head = false;
  if (tokens[j] && (tokens[j].tag === 'DT' || tokens[j].tag === 'PRP$')) j++;
  while (tokens[j] && /^(JJ|JJR|JJS|CD)$/.test(tokens[j].tag)) j++;
  if (tokens[j] && /^(NN|NNS|NNP|PRP)$/.test(tokens[j].tag)) { head = true; j++; }
  return head ? { start: i, end: j - 1 } : null;
}

function normalizeSpans(spans) {
  if (spans.length <= 1) return spans;
  const sorted = spans.slice().sort((a, b) => a.start - b.start || b.end - a.end);
  const out = [];
  for (const s of sorted) {
    const last = out[out.length - 1];
    if (last && s.start <= last.end) continue;
    out.push(s);
  }
  return out;
}

function chunk(tokens) {
  const spans = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t.tag === 'PUNCT' || t.tag === 'CC') { i++; continue; }
    if (t.tag === 'IN') {
      const np = detectNP(tokens, i + 1);
      const after = np ? tokens[np.end + 1] : null;
      const subord = after && /^(VBP|VBZ|VBD|MD)$/.test(after.tag);
      if (np && !subord) { spans.push({start:i, end:np.end, type:'PP', label:'Kelompok Kata Depan'}); i = np.end + 1; continue; }
    }
    if (t.tag === 'TO') {
      let j = i + 1;
      while (j < tokens.length && /^(VB|VBP|VBZ)$/.test(tokens[j].tag)) j++;
      const np = detectNP(tokens, j);
      if (np) j = np.end + 1;
      if (j > i + 1) { spans.push({start:i, end:j-1, type:'InfP', label:'Kelompok Kata Kerja Dasar (to + V1)'}); i = j; continue; }
    }
    if (t.tag === 'VBG') {
      let j = i + 1;
      const np = detectNP(tokens, j);
      if (np) j = np.end + 1;
      spans.push({start:i, end:j-1, type:'GerP', label:'Kelompok Kata Kerja -ing'}); i = j; continue;
    }
    if (/^(MD|VB|VBD|VBG|VBN|VBP|VBZ)$/.test(t.tag)) {
      let j = i;
      while (j < tokens.length) {
        if (/^(MD|VB|VBD|VBG|VBN|VBP|VBZ)$/.test(tokens[j].tag)) j++;
        else if (tokens[j].tag === 'RB' && tokens[j].lemma === 'not') j++;
        else break;
      }
      if (j > i) { spans.push({start:i, end:j-1, type:'VP', label:'Kelompok Kata Kerja'}); i = j; continue; }
    }
    const np = detectNP(tokens, i);
    if (np) { spans.push({start:np.start, end:np.end, type:'NP', label:'Kelompok Kata Benda'}); i = np.end + 1; continue; }
    if (/^(JJ|JJR|JJS)$/.test(t.tag)) {
      let j = i; while (j < tokens.length && /^(JJ|JJR|JJS)$/.test(tokens[j].tag)) j++;
      spans.push({start:i, end:j-1, type:'AdjP', label:'Kelompok Kata Sifat'}); i = j; continue;
    }
    if (t.tag === 'RB') {
      let j = i; while (j < tokens.length && tokens[j].tag === 'RB') j++;
      spans.push({start:i, end:j-1, type:'AdvP', label:'Kelompok Kata Keterangan'}); i = j; continue;
    }
    i++;
  }
  return normalizeSpans(spans);
}