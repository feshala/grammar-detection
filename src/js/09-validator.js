/* ============================================================
   09-validator.js
   Original section: 8. VALIDATOR
   Depends on: 01-util, 02-lexicon, 03-irregular, 04-contractions
   ============================================================ */
const AN_CONSONANT = /^(uni|use|user|usu|eu|one|once|ewe|ufo|utopia)/i;
const A_VOWEL = /^(hour|honest|honor|honour|heir|herb|x-)/i;

const INVARIANT_PAST = new Set([
  'let','put','cut','hit','set','cost','hurt','shut','spread','quit',
  'read','burst','shed','split','sweat','thrust','rid','bet','knit','spit'
]);

function detectTransferPatterns(tokens) {
  const issues = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i], n = tokens[i+1];
    if (!n) continue;
    if (t.lemma === 'to' && n.tag === 'VBG') {
      const prevT = i > 0 ? tokens[i-1] : null;
      const prev2T = i > 1 ? tokens[i-2] : null;
      const prepPhrases = ['forward','used','object','accustomed','committed','opposed','dedicated'];
      const isPrepTo = prevT && (
        (prev2T && prepPhrases.includes(prev2T.text.toLowerCase())) ||
        prepPhrases.includes(prevT.text.toLowerCase())
      );
      if (!isPrepTo) {
        issues.push({level:'error', glossId:'transfer-to-ing',
          msg:`Setelah "to" kata kerja harus dalam bentuk dasar (V1), bukan bentuk -ing. Ubah "${n.text}" menjadi bentuk dasar.`});
      }
    }
    if ((t.lemma === 'more' || (t.tag === 'RB' && t.text.toLowerCase() === 'more')) && n.tag === 'JJR') {
      issues.push({level:'error', glossId:'transfer-more-er',
        msg:`"more" dan akhiran -er tidak dipakai bersamaan. Pilih salah satu: "more + kata sifat dasar" atau "kata sifat + -er".`});
    }
    if (t.lemma === 'be' && n.lemma === 'agree') {
      issues.push({level:'error', glossId:'transfer-be-agree',
        msg:`"agree" sudah kata kerja, tidak perlu didahului "be". Cukup gunakan "agree" (atau "agrees" untuk he/she/it).`});
    }
    if (t.lemma === 'discuss' && n.lemma === 'about') {
      issues.push({level:'error', glossId:'transfer-discuss-about',
        msg:`"discuss" langsung diikuti objeknya, tanpa "about". Contoh: "discuss the topic", bukan "discuss about the topic".`});
    }
    if (t.lemma === 'married' && n.lemma === 'with') {
      issues.push({level:'error', glossId:'transfer-married-with',
        msg:`"married" diikuti "to", bukan "with". Contoh: "married to him", bukan "married with him".`});
    }
    if (t.lemma === 'since' && n.tag === 'CD') {
      const n2 = tokens[i+2];
      const n3 = tokens[i+3];
      const n2lem = n2 && n2.lemma ? n2.lemma.toLowerCase() : (n2 ? n2.text.toLowerCase().replace(/s$/,'') : '');
      const followedByAgo = !!(n3 && n3.text.toLowerCase() === 'ago');
      if (n2 && /^NN/.test(n2.tag) && DURATION_UNITS.has(n2lem) && !followedByAgo) {
        issues.push({level:'error', glossId:'transfer-since-for',
          msg:`"since" dipakai untuk titik waktu (mis. "since 2020", "since Monday"), bukan durasi. Untuk durasi gunakan "for" (mis. "for ${n.text} ${n2.text}").`});
      }
    }
  }
  return issues;
}

function checkAgreementForVerb(tokens, subjSpan, vidx) {
  if (!subjSpan) return null;
  const finite = tokens[vidx];
  if (!finite || !VERB_TAGS.has(finite.tag)) return null;
  if (finite.tag === 'MD') return null;
  const headIdx = findSubjectHead(tokens, subjSpan.start, subjSpan.end);
  if (headIdx >= 0 && NUMBER_INVARIANT.has(tokens[headIdx].text.toLowerCase())) return null;
  const num = getSubjectNumber(tokens, subjSpan);
  if (num === 'skip') return null;
  const ftag = finite.tag;
  const ftext = finite.text.toLowerCase();
  const flemma = (finite.lemma || '').toLowerCase();
  const is3sg = num === '3sg';
  const subjText = tokens.slice(subjSpan.start, vidx)
    .filter(t => t.tag !== 'PUNCT' && t.tag !== 'CC')
    .map(t => t.text).join(' ');
  if (ftext === 'were') {
    for (let k = subjSpan.start - 1; k >= Math.max(0, subjSpan.start - 3); k--) {
      if (tokens[k].tag === 'IN' && tokens[k].text.toLowerCase() === 'if') return null;
      if (!/^(RB|CC|UH|PUNCT)$/.test(tokens[k].tag)) break;
    }
  }
  if (flemma === 'be') {
    let ok;
    if (num === '1sg') ok = (ftext === 'am' || ftext === 'was');
    else if (num === '3sg') ok = (ftext === 'is' || ftext === 'was');
    else ok = (ftext === 'are' || ftext === 'were');
    if (!ok) return {level:'error', glossId:'subject-verb-agreement',
      msg:`Pelaku "${subjText}" tidak cocok dengan kata kerja "${finite.text}". Sesuaikan bentuk "be" (am/is/are atau was/were).`};
  } else if (flemma === 'have') {
    if (is3sg && ftag === 'VBP') return {level:'error', glossId:'subject-verb-agreement',
      msg:`Pelaku "${subjText}" tidak cocok dengan "${finite.text}". Untuk pelaku he/she/it, gunakan "has".`};
    else if (!is3sg && ftag === 'VBZ') return {level:'error', glossId:'subject-verb-agreement',
      msg:`Pelaku "${subjText}" tidak cocok dengan "${finite.text}". Untuk pelaku jamak (I/you/we/they), gunakan "have".`};
  } else if (flemma === 'do') {
    if (is3sg && ftag === 'VBP') return {level:'error', glossId:'subject-verb-agreement',
      msg:`Pelaku "${subjText}" tidak cocok dengan "${finite.text}". Untuk pelaku he/she/it, gunakan "does".`};
    else if (!is3sg && ftag === 'VBZ') return {level:'error', glossId:'subject-verb-agreement',
      msg:`Pelaku "${subjText}" tidak cocok dengan "${finite.text}". Untuk pelaku jamak (I/you/we/they), gunakan "do".`};
  } else if (ftag === 'VBZ') {
    if (!is3sg) return {level:'error', glossId:'subject-verb-agreement',
      msg:`Kata kerja "${finite.text}" tidak cocok dengan pelaku "${subjText}". Karena pelaku bukan "he", "she", atau "it", kata kerja ini tidak boleh pakai -s.`};
  } else if (ftag === 'VBP' || ftag === 'VB') {
    if (is3sg) return {level:'error', glossId:'subject-verb-agreement',
      msg:`Kata kerja "${finite.text}" tidak cocok dengan pelaku "${subjText}". Karena pelakunya "he", "she", atau "it", kata kerja ini harus ditambah -s.`};
  }
  return null;
}

function detectMissingCopula(tokens) {
  const hasFiniteVerb = tokens.some(t => /^(VB|VBD|VBG|VBN|VBP|VBZ|MD)$/.test(t.tag));
  if (hasFiniteVerb) return null;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (!/^(PRP|NNP|NN)$/.test(t.tag)) continue;
    if (t.unknown || t.uncertain) continue;
    let j = i + 1;
    while (j < tokens.length && tokens[j].tag === 'RB') j++;
    if (j < tokens.length && /^(JJ|JJR|JJS|NN)$/.test(tokens[j].tag)) {
      if (tokens[j].unknown || tokens[j].uncertain) continue;
      const subjText = tokens.slice(0, i+1).filter(x => x.tag !== 'PUNCT').map(x => x.text).join(' ');
      const predText = tokens.slice(i+1).filter(x => x.tag !== 'PUNCT').map(x => x.text).join(' ');
      return `${subjText} is ${predText}`;
    }
  }
  return null;
}

function validate(tokens, structureOrList) {
  const structures = Array.isArray(structureOrList) ? structureOrList : [structureOrList];
  const issues = [];

  for (const structure of structures) {
    if (!structure || !structure.subject || !structure.vp) continue;
    const subjTokens = tokens.slice(structure.subject.start, structure.subject.end + 1);
    const hasCC = subjTokens.some(t => t.tag === 'CC');
    let num = getSubjectNumber(tokens, structure.subject);
    if (hasCC) num = 'other';
    if (num === 'skip') continue;

    const headIdx = findSubjectHead(tokens, structure.subject.start, structure.subject.end);
    if (headIdx >= 0 && NUMBER_INVARIANT.has(tokens[headIdx].text.toLowerCase())) continue;

    const vpTokens = tokens.slice(structure.vp.start, structure.vp.end + 1);
    const hasModal = vpTokens.some(t => t.tag === 'MD');
    if (hasModal) continue;

    const finite = vpTokens.find(t => VERB_TAGS.has(t.tag));
    if (!finite) continue;

    const ftag = finite.tag;
    const ftext = finite.text.toLowerCase();
    const flemma = (finite.lemma || '').toLowerCase();
    const is3sg = num === '3sg';

    const subjText = tokens.slice(structure.subject.start, structure.vp.start)
      .filter(t => t.tag !== 'PUNCT' && t.tag !== 'CC')
      .map(t => t.text).join(' ');
    let isSubjunctive = false;
    if (ftext === 'were') {
      const lo = Math.max(0, structure.subject.start - 3);
      for (let k = structure.subject.start - 1; k >= lo; k--) {
        if (tokens[k].tag === 'IN' && tokens[k].text.toLowerCase() === 'if') { isSubjunctive = true; break; }
        if (!/^(RB|CC|UH|PUNCT)$/.test(tokens[k].tag)) break;
      }
      if (!isSubjunctive) {
        for (let k = structure.subject.start; k <= structure.subject.end; k++) {
          if (tokens[k].tag === 'IN' && tokens[k].text.toLowerCase() === 'if') { isSubjunctive = true; break; }
        }
      }
    }
    if (isSubjunctive) continue;

    if (flemma === 'be') {
      let ok;
      if (num === '1sg') ok = (ftext === 'am' || ftext === 'was');
      else if (num === '3sg') ok = (ftext === 'is' || ftext === 'was');
      else ok = (ftext === 'are' || ftext === 'were');
      if (!ok) issues.push({level:'error', glossId:'subject-verb-agreement', msg:`Pelaku "${subjText}" tidak cocok dengan kata kerja "${finite.text}". Sesuaikan bentuk "be" (am/is/are atau was/were).`});
    } else if (flemma === 'have') {
      if (is3sg && ftag === 'VBP') issues.push({level:'error', glossId:'subject-verb-agreement', msg:`Pelaku "${subjText}" tidak cocok dengan "${finite.text}". Untuk pelaku he/she/it, gunakan "has".`});
      else if (!is3sg && ftag === 'VBZ') issues.push({level:'error', glossId:'subject-verb-agreement', msg:`Pelaku "${subjText}" tidak cocok dengan "${finite.text}". Untuk pelaku jamak (I/you/we/they), gunakan "have".`});
    } else if (flemma === 'do') {
      if (is3sg && ftag === 'VBP') issues.push({level:'error', glossId:'subject-verb-agreement', msg:`Pelaku "${subjText}" tidak cocok dengan "${finite.text}". Untuk pelaku he/she/it, gunakan "does".`});
      else if (!is3sg && ftag === 'VBZ') issues.push({level:'error', glossId:'subject-verb-agreement', msg:`Pelaku "${subjText}" tidak cocok dengan "${finite.text}". Untuk pelaku jamak (I/you/we/they), gunakan "do".`});
    } else if (ftag === 'VBZ') {
      if (!is3sg) issues.push({level:'error', glossId:'subject-verb-agreement', msg:`Kata kerja "${finite.text}" tidak cocok dengan pelaku "${subjText}". Karena pelaku bukan "he", "she", atau "it", kata kerja ini tidak boleh pakai -s.`});
    } else if (ftag === 'VBP' || ftag === 'VB') {
      if (is3sg) issues.push({level:'error', glossId:'subject-verb-agreement', msg:`Kata kerja "${finite.text}" tidak cocok dengan pelaku "${subjText}". Karena pelakunya "he", "she", atau "it", kata kerja ini harus ditambah -s.`});
    }
  }

  /* [W12-B] Pass kedua: finit verb ke-2+ per klausa.
     [W12-C] Perbaikan:
     (a) skip finit yang didahului TO/MD/aux.
     (b) batasi pencarian subjek pada relativizer terakhir. */
  for (const structure of structures) {
    if (!structure) continue;
    const range = structure.range || {start: 0, end: tokens.length - 1};
    const finites = [];
    for (let i = range.start; i <= range.end; i++) {
      const t = tokens[i];
      if (!VERB_TAGS.has(t.tag) || t.tag === 'MD' || t.aux) continue;
      let pk = i - 1;
      while (pk >= range.start && /^(RB|PUNCT)$/.test(tokens[pk].tag)) pk--;
      const prevNT = pk >= 0 ? tokens[pk] : null;
      if (prevNT && (prevNT.tag === 'TO' || prevNT.tag === 'MD' || prevNT.aux)) continue;
      finites.push(i);
    }
    for (let k = 1; k < finites.length; k++) {
      const vidx = finites[k];
      let subjSearchEnd = vidx - 1;
      for (let j = vidx - 1; j >= range.start; j--) {
        if (tokens[j].tag === 'WP' || tokens[j].tag === 'WDT') {
          subjSearchEnd = j - 1;
          break;
        }
      }
      let subjStart = -1, subjEnd = -1;
      for (let j = subjSearchEnd; j >= range.start; j--) {
        const t = tokens[j];
        if (t.tag === 'PRP' || /^(NN|NNP)$/.test(t.tag)) {
          let s = j;
          while (s > range.start && /^(DT|PRP\$|JJ|JJR|JJS|CD)$/.test(tokens[s-1].tag)) s--;
          subjStart = s; subjEnd = j;
          break;
        }
      }
      if (subjStart < 0) continue;
      const issue = checkAgreementForVerb(tokens, {start: subjStart, end: subjEnd}, vidx);
      if (issue) issues.push(issue);
    }
  }

  tokens.forEach((t, i) => {
    if (t.tag === 'MD') {
      const vIdx = findVerbAfterAux(tokens, i);
      if (vIdx > 0) {
        const v = tokens[vIdx];
        if (VERB_TAGS.has(v.tag) && v.tag !== 'VB' && v.tag !== 'VBP')
          issues.push({level:'error', glossId:'modal-verb', msg:`Setelah kata bantu "${t.text}" kata kerja harus dalam bentuk dasar (tanpa -s/-ed/-ing). Ubah "${v.text}" menjadi bentuk dasar.`});
      }
    } else if (t.lemma === 'do' && t.aux) {
      const vIdx = findVerbAfterAux(tokens, i);
      if (vIdx > 0) {
        const v = tokens[vIdx];
        if (VERB_TAGS.has(v.tag) && v.tag !== 'VB')
          issues.push({level:'error', glossId:'auxiliary-verb', msg:`Setelah kata bantu "${t.text}" kata kerja harus dalam bentuk dasar (tanpa -s/-ed/-ing). Ubah "${v.text}" menjadi bentuk dasar.`});
      }
    } else if (t.lemma === 'have' && t.aux) {
      const vIdx = findVerbAfterAux(tokens, i);
      if (vIdx > 0) {
        const v = tokens[vIdx];
        if (VERB_TAGS.has(v.tag) && v.tag !== 'VBN' && v.tag !== 'VBG') {
          const isInvariantPast = v.tag === 'VB' && INVARIANT_PAST.has(v.text.toLowerCase());
          if (!isInvariantPast) issues.push({level:'error', glossId:'v3', msg:`Setelah have/has/had kata kerja harus dalam bentuk V3. Ubah "${v.text}" menjadi bentuk V3.`});
        }
      }
    } else if (t.lemma === 'be' && t.aux) {
      const vIdx = findVerbAfterAux(tokens, i);
      if (vIdx > 0) {
        const v = tokens[vIdx];
        const adjLike = v.tag === 'VBD' && v.amb?.includes('JJ');
        const isTransferAgree = v.lemma === 'agree';
        if (VERB_TAGS.has(v.tag) && v.tag !== 'VBG' && v.tag !== 'VBN' && !adjLike && !isTransferAgree)
          issues.push({level:'error', glossId:'auxiliary-verb', msg:`Setelah be (am/is/are/was/were) kata kerja harus berbentuk V-ing (untuk aksi sedang berlangsung) atau V3 (untuk kalimat pasif). Ubah "${v.text}".`});
      }
    }
    if (t.tag === 'NNS' && t.lemma && UNCOUNTABLE.has(t.lemma.toLowerCase()) && /s$/i.test(t.text)) {
      issues.push({level:'error', glossId:'noun', msg:`Kata "${t.text}" tidak lazim dijamak. Kata dasar "${t.lemma}" adalah uncountable, jadi tidak pakai -s.`});
    }
    if (t.tag === 'DT' && (t.text.toLowerCase() === 'a' || t.text.toLowerCase() === 'an')) {
      const next = tokens[i+1];
      if (next && /^[A-Za-z]/.test(next.text)) {
        let vowel;
        if (A_VOWEL.test(next.text)) vowel = true;
        else if (AN_CONSONANT.test(next.text)) vowel = false;
        else vowel = /^[aeiou]/i.test(next.text);
        if (t.text.toLowerCase() === 'a' && vowel) issues.push({level:'warn', glossId:'determiner', msg:`Gunakan "an" sebelum "${next.text}" karena kata itu dimulai dengan bunyi vokal.`});
        if (t.text.toLowerCase() === 'an' && !vowel) issues.push({level:'warn', glossId:'determiner', msg:`Gunakan "a" sebelum "${next.text}" karena kata itu tidak dimulai dengan bunyi vokal.`});
      }
    }
    if (t.tag === 'NN' && !t.unknown && !t.uncertain
        && ARTICLE_REQUIRED_NN.has(t.text.toLowerCase())) {
      const prev = i > 0 ? tokens[i-1] : null;
      let fire = false;
      if (!prev) { fire = true; }
      else if (prev.tag === 'DT' || prev.tag === 'PRP$' || prev.tag === 'CD' || prev.tag === 'IN') { /* skip */ }
      else if (prev.tag === 'JJ' || prev.tag === 'JJR' || prev.tag === 'JJS') {
        const prev2 = i > 1 ? tokens[i-2] : null;
        if (!(prev2 && (prev2.tag === 'DT' || prev2.tag === 'PRP$' || prev2.tag === 'CD'))) fire = true;
      }
      else if (/^(VB|VBD|VBG|VBN|VBP|VBZ|MD)$/.test(prev.tag)) { fire = true; }
      if (fire) {
        issues.push({level:'warn', glossId:'missing-article',
          msg:`Kata benda tunggal "${t.text}" biasanya butuh kata penunjuk seperti "a", "an", atau "the" di depannya.`});
      }
    }
  });

  const transferIssues = detectTransferPatterns(tokens);
  for (const ti of transferIssues) issues.push(ti);

  if (!issues.length) {
    const meaningful = tokens.filter(t => t.tag !== 'PUNCT');
    const unknownCount = meaningful.filter(t => t.uncertain || t.unknown).length;
    const total = meaningful.length || 1;
    const unknownRatio = unknownCount / total;
    const hasVerb = tokens.some(t => /^(VB|VBD|VBG|VBN|VBP|VBZ|MD)$/.test(t.tag));
    const hasSubject = structures.some(s => s && s.subject !== null);

    if (!hasVerb || !hasSubject || unknownRatio > 0.4) {
      const copulaHint = !hasVerb ? detectMissingCopula(tokens) : null;
      issues.push({
        level: 'info', verdict: 'abstain',
        msg: copulaHint
          ? `Kalimat ini tampaknya tidak punya kata kerja. Dalam bahasa Inggris, kalimat dengan predikat kata sifat atau kata benda butuh "be" (am/is/are/was/were). Coba tambahkan "is/are/am" sebelum predikat. Contoh: "${copulaHint}".`
          : 'Kalimat tidak dapat dianalisis dengan yakin. Aplikasi hanya mengenali sebagian kata, atau struktur kalimatnya terlalu kompleks untuk kamus sederhana ini. Coba gunakan kalimat yang lebih sederhana dengan kata-kata umum.'
      });
    } else if (unknownRatio > 0.15) {
      issues.push({
        level: 'info', verdict: 'hedged',
        msg: `Tidak ada kesalahan yang terdeteksi pada cakupan yang dikenali. Namun sekitar ${Math.round(unknownRatio*100)}% kata ditebak dari bentuk/konteks (di luar kamus), jadi hasil mungkin belum lengkap.`
      });
    } else {
      issues.push({
        level: 'info', verdict: 'clean',
        msg: 'Bagus! Tidak ada kesalahan grammar yang terdeteksi pada pemeriksaan dasar. (Cakupan: kalimat sederhana dengan kata umum.)'
      });
    }
  }
  return issues;
}