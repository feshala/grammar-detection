/* ============================================================
   05-tagger.js
   Original section: 4. TOKENIZER + TAGGER
   Depends on: LEX, IRREG (02, 03), C, ING_NOUNS (04)
   ============================================================ */
function normalizeQuotes(text) {
  return String(text)
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035\u02BC]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"');
}

function tokenize(text) {
  const normalized = normalizeQuotes(text);
  const raw = normalized.match(/[A-Za-z]+(?:'[A-Za-z]+)?|\d+(?:\.\d+)?|[.,!?;:()"]/g) || [];
  const out = [];
  for (const w of raw) {
    const parts = C[w.toLowerCase()];
    if (parts) {
      parts.forEach((p, i) => out.push({
        text: p[0], tag: p[1], lemma: p[2], form: p[3], aux: !!p[4],
        raw: w, contStart: i === 0, contEnd: i === parts.length - 1, isCont: true,
        uncertain: false
      }));
    } else {
      out.push({ text: w, raw: w, tag: null, lemma: null, form: null, contStart: true, contEnd: true, isCont: false, uncertain: true });
    }
  }
  return out;
}

const isVerbWord = w => {
  const e = LEX[w.toLowerCase()];
  if (!e) return !!IRREG[w.toLowerCase()];
  return /^VB/.test(e.t) || (e.amb && e.amb.includes('VB'));
};

function stemS(w) {
  if (!w || w.length < 3) return w;
  const inLex = s => !!(LEX[s] || IRREG[s]);
  const a = w.slice(0, -1);
  const b = w.endsWith('es') ? w.slice(0, -2) : null;
  if (inLex(a)) return a;
  if (b && inLex(b)) return b;
  if (w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.endsWith('es'))  return w.slice(0, -2);
  return w.slice(0, -1);
}
function stemEd(w) {
  if (w.endsWith('ied')) return w.slice(0, -3) + 'y';
  if (w.endsWith('ed')) {
    const inLex = s => !!(LEX[s] || IRREG[s]);
    const noEd = w.slice(0, -2);
    const noD  = w.slice(0, -1);
    if (inLex(noD) && !inLex(noEd)) return noD;
    if (inLex(noEd)) return noEd;
    if (noEd.length >= 2 && noEd[noEd.length-1] === noEd[noEd.length-2] && !/[aeiou]/.test(noEd[noEd.length-1])) {
      const shortened = noEd.slice(0, -1);
      if (inLex(shortened)) return shortened;
    }
    return noEd;
  }
  return w;
}
function stemIng(w) {
  let s = w.slice(0, -3);
  const inLex = x => !!(LEX[x] || IRREG[x]);
  if (inLex(s)) return s;
  if (s.length>=3 && !/[aeiou]$/.test(s)) {
    const g = s+'e';
    if (inLex(g)) return g;
  }
  if (s.length>=2 && s[s.length-1]===s[s.length-2] && !/[aeiou]/.test(s[s.length-1])) {
    const cut = s.slice(0, -1);
    if (inLex(cut)) return cut;
  }
  return s;
}

function tagOne(tokens, i) {
  const t = tokens[i];
  if (t.tag) return;
  t.uncertain = true;
  const raw = t.text, w = raw.toLowerCase();
  const prev = i > 0 ? tokens[i-1] : null;
  const next = i < tokens.length-1 ? tokens[i+1] : null;
  const prevTag = prev ? prev.tag : null;

  if (/^[.,!?;:()"]$/.test(raw)) { t.tag = 'PUNCT'; t.uncertain = false; return; }
  if (/^\d/.test(raw)) { t.tag = 'CD'; t.lemma = raw; t.uncertain = false; return; }

  if (w === 'to') {
    const vish = next && (isVerbWord(next.text) || IRREG[next.text.toLowerCase()]);
    t.tag = vish ? 'TO' : 'IN'; t.lemma = 'to';
    t.uncertain = false;
    if (!vish) t.toPrep = true;
    return;
  }
  if (w === 'that') {
    const nn = next && /^(NN|NNS|NNP|JJ|DT|CD)$/.test(next.tag || LEX[next.text.toLowerCase()]?.t || '');
    t.tag = nn ? 'DT' : 'IN'; t.lemma = 'that';
    if (!nn) t.amb = ['DT','PRP'];
    return;
  }
  if (w === 'her' || w === 'his') {
    const nn = next && /^(NN|NNS|NNP|JJ)$/.test(next.tag || LEX[next.text.toLowerCase()]?.t || '');
    t.tag = nn ? 'PRP$' : 'PRP'; t.lemma = w;
    return;
  }
  if (w === 'like') {
    const pAux = prev && (prev.aux || prevTag === 'MD');
    const pSubj = prev && /^(PRP|NN|NNP|NNS)$/.test(prevTag||'') && !(next && next.tag === 'PUNCT');
    if (prevTag === 'TO' || pAux || pSubj) { t.tag = 'VB'; t.lemma = 'like'; t.form = 'V1'; t.amb = ['IN']; }
    else { t.tag = 'IN'; t.lemma = 'like'; t.amb = ['VB']; }
    return;
  }
  if (['fast','hard','late','early','far'].includes(w)) {
    const pBe = prev && prev.lemma === 'be';
    const nn = next && /^(NN|NNS|NNP)$/.test(next.tag || LEX[next.text.toLowerCase()]?.t || '');
    if (pBe || nn) { t.tag = 'JJ'; t.lemma = w; t.amb = ['RB']; }
    else { t.tag = 'RB'; t.lemma = w; t.amb = ['JJ']; }
    return;
  }

  const lex = LEX[w];
  if (lex) {
    if (IRREG[w]?.form === 'V3' && ((prev?.lemma === 'have' && prev.aux) || (prev?.lemma === 'be' && prev.aux))) {
      const ir = IRREG[w];
      t.tag = ir.tag; t.lemma = ir.lemma; t.form = ir.form;
      if (ir.amb) t.amb = ir.amb.slice();
      t.uncertain = false;
      return;
    }
    t.tag = lex.t; t.lemma = lex.lemma || w; t.form = lex.form;
    if (lex.aux) t.aux = true;
    if (lex.person) t.person = lex.person;
    if (lex.num) t.num = lex.num;
    if (lex.amb) t.amb = lex.amb.slice();
    if (t.amb?.includes('VB')) {
      const afterAux = prev && (prev.aux || prevTag === 'MD' || prevTag === 'TO');
      const afterSubj = prev && prevTag === 'PRP' && !(next && next.tag === 'PUNCT');
      if (afterAux || afterSubj) { t.tag = 'VB'; t.form = 'V1'; }
    }
    if (t.tag === 'VB' && t.amb?.includes('NN') && prevTag && /^(DT|PRP\$|JJ)$/.test(prevTag)) {
      t.tag = 'NN'; t.form = null;
    }
    t.uncertain = false;
    return;
  }
  if (IRREG[w]) {
    const ir = IRREG[w];
    if (ir.tag === 'VBD' && V2_EQ_V3.has(w)) {
      let k = i - 1;
      while (k >= 0 && tokens[k].tag === 'RB') k--;
      const before = k >= 0 ? tokens[k] : null;
      const afterHave = before && before.lemma === 'have' && before.aux;
      const afterBe   = before && before.lemma === 'be'   && before.aux;
      if (afterHave || afterBe) {
        t.tag = 'VBN'; t.lemma = ir.lemma; t.form = 'V3';
        if (ir.amb) t.amb = ir.amb.slice();
        t.uncertain = false;
        return;
      }
    }
    t.tag = ir.tag; t.lemma = ir.lemma; t.form = ir.form;
    if (ir.amb) t.amb = ir.amb.slice();
    t.uncertain = false;
    return;
  }
  if (w.length > 4 && w.endsWith('ing')) {
    const nounCtx = prevTag === 'DT' || prevTag === 'PRP$' || prevTag === 'JJ';
    if (ING_NOUNS.has(w)) { t.tag = 'NN'; t.lemma = w; t.uncertain = false; }
    else {
      const stem = stemIng(w);
      t.tag = 'VBG'; t.lemma = stem; t.form = 'V-ing';
      if (nounCtx) t.amb = ['NN'];
      if (LEX[stem] || IRREG[stem]) t.uncertain = false;
    }
    return;
  }
  if (w.length > 4 && w.endsWith('ed')) {
    let k = i - 1;
    while (k >= 0 && tokens[k].tag === 'RB' && tokens[k].lemma === 'not') k--;
    const before = k >= 0 ? tokens[k] : null;
    const pHave = before && before.lemma === 'have';
    const pBe = before && before.lemma === 'be';
    const stem = stemEd(w);
    const knownStem = !!(LEX[stem] || IRREG[stem]);
    if (pHave || pBe) { t.tag = 'VBN'; t.form = 'V3'; t.lemma = stem; t.uncertain = false; }
    else { t.tag = 'VBD'; t.form = 'V2'; t.lemma = stem; t.amb = ['VBN','JJ']; if (knownStem) t.uncertain = false; }
    return;
  }
  if (w.length > 2 && w.endsWith('s') && !/(ss|us|is)$/.test(w)) {
    const stem = stemS(w), se = LEX[stem];
    if (se && /^VB/.test(se.t)) { t.tag = 'VBZ'; t.form = 'V-s'; t.lemma = stem; t.uncertain = false; return; }
    if (IRREG[stem] && /V[BD]/.test(IRREG[stem].tag)) { t.tag = 'VBZ'; t.form = 'V-s'; t.lemma = stem; t.uncertain = false; return; }
    if (se && /^NN/.test(se.t)) { t.tag = 'NNS'; t.lemma = stem; t.uncertain = false; return; }
    t.tag = 'NNS'; t.lemma = stem; t.amb = ['VBZ']; return;
  }
  if (w.length > 4 && w.endsWith('ly')) { t.tag = 'RB'; t.lemma = w; return; }
  if (w.length > 5 && w.endsWith('est')) { t.tag = 'JJS'; t.lemma = w; return; }
  if (w.length > 4 && w.endsWith('er') && w.length <= 6) { t.tag = 'JJR'; t.lemma = w; t.amb = ['NN']; return; }
  if (w.length > 4 && /(tion|sion|ment|ness|ity|ance|ence|ship|hood|dom|ism)$/.test(w)) { t.tag = 'NN'; t.lemma = w; return; }
  if (w.length > 4 && /(ful|ous|ive|able|ible|ical|ic|al)$/.test(w)) { t.tag = 'JJ'; t.lemma = w; return; }

  if (prevTag === 'MD') { t.tag = 'VB'; t.lemma = w; t.form = 'V1'; return; }
  if (prevTag === 'DT' || prevTag === 'PRP$' || prevTag === 'CC' || prevTag === 'IN' || prevTag === 'JJ') { t.tag = 'NN'; t.lemma = w; return; }
  if (prevTag === 'TO') { t.tag = 'VB'; t.lemma = w; t.form = 'V1'; return; }
  t.tag = 'NN'; t.lemma = w; t.unknown = true;
}

function markAux(tokens) {
  const n = tokens.length;
  for (let i = 0; i < n; i++) {
    const t = tokens[i];
    if (t.tag === 'MD') { t.aux = true; continue; }
    if (t.lemma === 'be' || t.lemma === 'do' || t.lemma === 'have') {
      t.aux = findVerbAfterAux(tokens, i) > 0;
    } else t.aux = false;
  }
}

function fixAmbiguousIs(tokens) {
  for (let i = 0; i < tokens.length - 1; i++) {
    const t = tokens[i], n = tokens[i+1];
    if (t.lemma === 'be' && t.isCont && /^(he|she|it|that|what)'s$/i.test(t.raw) && n.tag === 'VBN') {
      t.text = 'has'; t.tag = 'VBZ'; t.lemma = 'have'; t.form = 'V-s';
    }
  }
}

function tagAll(tokens) {
  for (let i = 0; i < tokens.length; i++) tagOne(tokens, i);
  fixAmbiguousIs(tokens);
  markAux(tokens);
}