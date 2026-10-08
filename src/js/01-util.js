/* ============================================================
   01-util.js
   Original section: 0. UTIL SHARED
   ============================================================ */
const VERB_TAGS = new Set(['VB','VBD','VBG','VBN','VBP','VBZ']);

function findVerbAfterAux(tokens, startIdx, maxHops) {
  if (maxHops == null) maxHops = 4;
  for (let k = 1; k <= maxHops && startIdx + k < tokens.length; k++) {
    const t = tokens[startIdx + k];
    if (VERB_TAGS.has(t.tag)) return startIdx + k;
    if (/^(RB|PRP|DT|PRP\$|JJ|JJR|JJS|CD|WP|WDT|WRB|UH)$/.test(t.tag)) continue;
    return -1;
  }
  return -1;
}

const QUANTIFIER_HEADS = new Set([
  'lot','number','group','rest','majority','minority','part','half','all',
  'some','most','none','plenty','couple','dozen','hundred','thousand','million','billion'
]);

function findSubjectHead(tokens, start, end) {
  for (let i = start; i <= end; i++) {
    const t = tokens[i];
    if (t.text.toLowerCase() === 'one' && tokens[i+1] && tokens[i+1].lemma === 'of') {
      return i;
    }
    if (/^(DT|PRP\$|CD|JJ|JJR|JJS|RB)$/.test(t.tag)) continue;
    if (t.tag === 'WP' || t.tag === 'WDT' || t.tag === 'WRB') return -1;
    if (t.tag === 'IN') {
      if (t.text.toLowerCase() === 'of') {
        const prevT = i > 0 ? tokens[i-1] : null;
        const beforeQuant = i-2 >= 0 ? tokens[i-2] : null;
        const isDefinite = beforeQuant && beforeQuant.tag === 'DT' && beforeQuant.text.toLowerCase() === 'the';
        if (prevT && /^NN/.test(prevT.tag) && QUANTIFIER_HEADS.has(prevT.text.toLowerCase()) && !isDefinite) continue;
      }
      return -1;
    }
    if (/^(NN|NNS|NNP|PRP)$/.test(t.tag)) {
      if (tokens[i+1] && tokens[i+1].tag === 'IN' && tokens[i+1].text.toLowerCase() === 'of' && QUANTIFIER_HEADS.has(t.text.toLowerCase())) {
        const beforeQuant = i > 0 ? tokens[i-1] : null;
        const isDefinite = beforeQuant && beforeQuant.tag === 'DT' && beforeQuant.text.toLowerCase() === 'the';
        if (!isDefinite) continue;
      }
      return i;
    }
    if (t.tag === 'VBG') return i;
    return -1;
  }
  return -1;
}

function getSubjectNumber(tokens, span) {
  if (!span) return 'skip';
  const headIdx = findSubjectHead(tokens, span.start, span.end);
  if (headIdx >= 0) {
    const h = tokens[headIdx], w = h.text.toLowerCase();
    if (h.tag === 'PRP') {
      if (w === 'i') return '1sg';
      if (w === 'he' || w === 'she' || w === 'it') return '3sg';
      return 'other';
    }
    if (h.tag === 'NNP' || h.tag === 'NN' || h.tag === 'VBG') return '3sg';
    if (h.tag === 'CD' && w === 'one') return '3sg';
    if (h.tag === 'NNS') return 'other';
    return 'skip';
  }
  const last = tokens[span.end];
  if (last.tag === 'PRP') {
    const w = last.text.toLowerCase();
    if (w === 'i') return '1sg';
    if (w === 'he' || w === 'she' || w === 'it') return '3sg';
    return 'other';
  }
  if (last.tag === 'DT') {
    const w = last.text.toLowerCase();
    if (w === 'this' || w === 'that') return '3sg';
    if (w === 'these' || w === 'those') return 'other';
  }
  return 'skip';
}