/* ============================================================
   10-labels.js
   Original section: 9. LABEL + EXPLANATION
   ============================================================ */
const TAG_LABEL = {
  NN:'Kata benda tunggal', NNS:'Kata benda jamak', NNP:'Nama diri (orang/tempat)',
  PRP:'Kata ganti orang', PRP$:'Kata ganti kepemilikan',
  VB:'Kata kerja dasar', VBD:'Kata kerja bentuk lampau (V2)', VBG:'Kata kerja -ing (V-ing)',
  VBN:'Kata kerja bentuk ketiga (V3)', VBP:'Kata kerja dasar (untuk I/you/we/they)',
  VBZ:'Kata kerja untuk he/she/it (V-s)',
  MD:'Kata bantu modal', JJ:'Kata sifat', JJR:'Kata sifat pembanding',
  JJS:'Kata sifat paling (superlatif)', RB:'Kata keterangan', DT:'Kata penunjuk',
  IN:'Kata depan atau penghubung', CC:'Kata sambung setara',
  TO:'Penanda kata kerja dasar (to)', CD:'Kata bilangan', UH:'Kata seru',
  WP:'Kata tanya (who, what)', WP$:'Kata tanya kepemilikan (whose)', WDT:'Kata tanya penunjuk (which)',
  WRB:'Kata tanya keterangan (when, where)', PUNCT:'Tanda baca'
};

function wordFunction(idx, tokens, spans, structure) {
  const span = spans.find(s => idx >= s.start && idx <= s.end);
  let phraseRole = null, phraseGloss = null;
  if (span && span.type === 'VP' && structure.vp && idx >= structure.vp.start && idx <= structure.vp.end) {
    phraseRole = 'Predikat (kelompok kata kerja)'; phraseGloss = 'predicate';
  } else if (span && span.type === 'NP') {
    if (structure.subject && span.start === structure.subject.start && span.end === structure.subject.end) { phraseRole = 'Pelaku (Subject)'; phraseGloss = 'subject'; }
    else if (structure.object && span.start === structure.object.start) { phraseRole = 'Objek langsung'; phraseGloss = 'direct-object'; }
    else { phraseRole = 'Kelompok kata benda'; phraseGloss = 'noun-phrase'; }
  }
  else if (span?.type === 'PP') { phraseRole = 'Keterangan / kelompok kata depan'; phraseGloss = 'prepositional-phrase'; }
  else if (span?.type === 'InfP') { phraseRole = 'Kelompok to + kata kerja'; phraseGloss = 'infinitive-phrase'; }
  else if (span?.type === 'GerP') { phraseRole = 'Kelompok kata kerja -ing'; phraseGloss = 'gerund-phrase'; }
  else if (span?.type === 'AdvP') { phraseRole = 'Keterangan'; phraseGloss = 'adverb-phrase'; }
  else if (span?.type === 'AdjP') { phraseRole = 'Kelompok kata sifat'; phraseGloss = 'adjective-phrase'; }

  const tense = (structure.grammar || []).find(g => idx >= g.span.start && idx <= g.span.end);
  return {phraseRole, phraseGloss, span, tense};
}

function explainWord(idx, tokens, spans, structure) {
  const t = tokens[idx];
  const info = {text:t.raw, tag:t.tag, lemma:t.lemma, form:t.form};
  let reason;
  if (t.isCont) reason = `Kata ini bagian dari singkatan "${t.raw}". Aplikasi memisahkannya agar mudah dianalisis.`;
  else if (t.amb?.length) reason = `Kata ini bisa punya lebih dari satu arti (${t.amb.join(', ')}). Dari posisinya dalam kalimat, aplikasi memilih "${t.tag}".`;
  else if (t.unknown) reason = `Kata ini tidak ada di kamus. Aplikasi menebak jenis katanya dari bentuk dan posisinya.`;
  else reason = `Aplikasi mengenali kata ini sebagai "${t.tag}" dari kamus, bentuk katanya, atau posisinya dalam kalimat.`;
  let form = t.form;
  if (!form && /^VB/.test(t.tag)) {
    form = {VBD:'V2', VBN:'V3', VBG:'V-ing', VBZ:'V1 + s', VBP:'V1'}[t.tag];
  }
  return Object.assign(info, {label:TAG_LABEL[t.tag] || t.tag, form, aux:t.aux, reason, ambiguous:t.amb || []});
}