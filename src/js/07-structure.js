/* ============================================================
   07-structure.js
   Original section: 6. STRUCTURE ANALYZER
   Depends on: QUANTIFIER_HEADS, VERB_TAGS (01)
   ============================================================ */
const CLAUSE_SUBORDINATORS = new Set([
  'that','because','if','although','though','while','unless','since',
  'after','before','until','whenever','whether'
]);
function splitClauses(tokens) {
  const clauses = [];
  let start = 0, seenVerb = false;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (/^(VB|VBD|VBG|VBN|VBP|VBZ|MD)$/.test(t.tag)) seenVerb = true;
    let split = false;
    if (t.tag === 'PUNCT' && /[.!?]/.test(t.text)) split = true;
    else if (t.tag === 'CC' && seenVerb && i > start) split = true;
    else if (t.tag === 'IN' && CLAUSE_SUBORDINATORS.has(t.text.toLowerCase()) && seenVerb && i > start) {
      const after = tokens[i+1];
      if (after && /^(PRP|NN|NNS|NNP)$/.test(after.tag)) split = true;
    }
    else if (t.tag === 'WRB' && seenVerb && i > start) {
      const after = tokens[i+1];
      if (after && /^(PRP|NN|NNS|NNP)$/.test(after.tag)) split = true;
    }
    else if (t.tag === 'PUNCT' && t.text === ',' && seenVerb && i > start) {
      const firstTok = tokens[start];
      const startIsSubord = firstTok && firstTok.tag === 'IN' && CLAUSE_SUBORDINATORS.has(firstTok.text.toLowerCase());
      if (startIsSubord) split = true;
    }
    if (split) {
      if (i - 1 >= start) clauses.push({start, end: i - 1});
      start = i + 1;
      seenVerb = false;
    }
  }
  if (start < tokens.length) clauses.push({start, end: tokens.length - 1});
  return clauses.filter(c => c.start <= c.end);
}

function analyzeStructure(tokens, spans, rangeStart, rangeEnd) {
  if (rangeStart == null) rangeStart = 0;
  if (rangeEnd == null) rangeEnd = tokens.length - 1;
  const vpSpans = spans.filter(s => s.type === 'VP' && s.start >= rangeStart && s.end <= rangeEnd);
  if (!vpSpans.length) return {vps:[], subject:null, object:null, adverbials:[], range:{start:rangeStart, end:rangeEnd}};
  let vp = vpSpans[0], subject = null;
  let relStart = -1;
  for (let j = rangeStart; j < vp.start; j++) {
    if (tokens[j].tag === 'WP' || tokens[j].tag === 'WDT') { relStart = j; break; }
  }
  if (relStart >= 0 && vpSpans.length > 1) vp = vpSpans[1];

  let lead = rangeStart;
  while (lead <= rangeEnd && /^(WRB|WP|WDT|WP\$|CC|UH)$/.test(tokens[lead].tag)) lead++;
  const startIsAux = vp.start === lead && vp.end === vp.start && /^(MD|VBP|VBZ|VBD)$/.test(tokens[vp.start].tag);
  const nextIdx = vp.start + 1;
  const nextNPish = nextIdx <= rangeEnd && tokens[nextIdx] && /^(PRP|NN|NNS|NNP)$/.test(tokens[nextIdx].tag);
  if (startIsAux && nextNPish) {
    const later = vpSpans.find(v => v.start > nextIdx);
    if (later) {
      vp = {start:vp.start, end:later.end, type:'VP', label:'Kelompok Kata Kerja'};
      subject = {start:nextIdx, end:later.start - 1};
      while (subject.start <= subject.end && /^(RB|CC|UH)$/.test(tokens[subject.start].tag)) subject.start++;
      while (subject.end >= subject.start && /^(RB|CC|UH)$/.test(tokens[subject.end].tag)) subject.end--;
      if (subject.start > subject.end) subject = null;
    }
  }
  if (!subject) {
    const subjBoundary = relStart >= 0 ? relStart : vp.start;
    const npSpans = spans.filter(s => s.type === 'NP' && s.end < subjBoundary && s.start >= rangeStart);
    const validNPs = [];
    for (const np of npSpans) {
      const prev = np.start > 0 ? tokens[np.start - 1] : null;
      if (prev && prev.tag === 'IN') continue;
      validNPs.push(np);
    }
    if (validNPs.length) {
      const lastNP = validNPs[validNPs.length - 1];
      let startTok = lastNP.start;
      let endTok = lastNP.end;
      const nextTok = tokens[endTok + 1];
      if (nextTok && nextTok.tag === 'IN' && nextTok.text.toLowerCase() === 'of'
          && QUANTIFIER_HEADS.has(tokens[endTok].text.toLowerCase())) {
        const afterOf = spans.find(s => s.type === 'NP' && s.start === endTok + 2);
        if (afterOf) endTok = afterOf.end;
      }
      let idx = validNPs.length - 1;
      while (idx >= 1) {
        const prevNP = validNPs[idx - 1];
        let hasCCBetween = false;
        for (let k = prevNP.end + 1; k < startTok; k++) {
          if (tokens[k].tag === 'CC') { hasCCBetween = true; break; }
        }
        if (hasCCBetween) { startTok = prevNP.start; idx--; }
        else break;
      }
      subject = {start: startTok, end: endTok};
    } else {
      let s = rangeStart, e = vp.start - 1;
      while (s <= e && /^(RB|CC|UH|IN|WRB|WP|WDT|WP\$|PUNCT)$/.test(tokens[s].tag)) s++;
      while (e >= s && /^(RB|CC|UH|PUNCT)$/.test(tokens[e].tag)) e--;
      subject = e >= s ? {start:s, end:e} : null;
    }
  }
  const ppSpans = spans.filter(s => s.type === 'PP' && s.start >= rangeStart && s.end <= rangeEnd);
  const inPP = sp => ppSpans.some(p => sp.start > p.start && sp.end <= p.end);
  const object = spans.find(s => s.start > vp.end && s.end <= rangeEnd && s.type === 'NP' && !inPP(s)) || null;
  const adverbials = spans.filter(s => s.start > vp.end && s.end <= rangeEnd && (s.type === 'PP' || s.type === 'AdvP'));
  return {vps: vpSpans.map(v => v.start === vpSpans[0].start ? vp : v), vp, subject, object, adverbials, range:{start:rangeStart, end:rangeEnd}};
}