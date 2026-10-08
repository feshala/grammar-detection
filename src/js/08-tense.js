/* ============================================================
   08-tense.js
   Original section: 7. TENSE DETECTOR
   FROZEN: do not modify without an explicit wave goal.
   ============================================================ */
function detectTense(tokens, vp) {
  const verbs = [];
  for (let i = vp.start; i <= vp.end; i++) if (/^(MD|VB|VBD|VBG|VBN|VBP|VBZ)$/.test(tokens[i].tag)) verbs.push(tokens[i]);
  if (!verbs.length) return null;
  const L = verbs.map(v => v.lemma), T = verbs.map(v => v.tag);
  const N = verbs.length;

  const lastVerb = verbs[verbs.length - 1];
  if (L[0]==='be' && lastVerb.tag === 'VBG' && lastVerb.lemma === 'go') {
    const afterTo = tokens[vp.end + 1];
    const afterV  = tokens[vp.end + 2];
    if (afterTo && afterTo.tag === 'TO' && afterV && /^(VB|VBP|VBZ)$/.test(afterV.tag)) {
      return {name:'Be going to (Future)', formula:'be + going to + V1',
              span:{start:vp.start, end:vp.end + 2}, glossId:'simple-future'};
    }
  }

  if (L[0]==='have' && N>=3 && L[1]==='be' && T[2]==='VBG')
    return T[0]==='VBD'
      ? {name:'Past Perfect Continuous', formula:'had + been + V-ing', span:vp, glossId:'past-perfect-continuous'}
      : {name:'Present Perfect Continuous', formula:'have/has + been + V-ing', span:vp, glossId:'present-perfect-continuous'};
  if (L[0]==='have' && N>=3 && L[1]==='be' && T[2]==='VBN')
    return T[0]==='VBD'
      ? {name:'Past Perfect (Passive)', formula:'had + been + V3', span:vp, glossId:'passive-voice'}
      : {name:'Present Perfect (Passive)', formula:'have/has + been + V3', span:vp, glossId:'passive-voice'};

  if (L[0]==='have' && T[1]==='VBN')
    return T[0]==='VBD'
      ? {name:'Past Perfect', formula:'had + V3', span:vp, glossId:'past-perfect'}
      : {name:'Present Perfect', formula:'have/has + V3', span:vp, glossId:'present-perfect'};
  if (L[0]==='be' && T[1]==='VBG')
    return T[0]==='VBD'
      ? {name:'Past Continuous', formula:'was/were + V-ing', span:vp, glossId:'past-continuous'}
      : {name:'Present Continuous', formula:'am/is/are + V-ing', span:vp, glossId:'present-continuous'};
  if (L[0]==='be' && T[1]==='VBN')
    return T[0]==='VBD'
      ? {name:'Simple Past (Passive)', formula:'was/were + V3', span:vp, glossId:'passive-voice'}
      : {name:'Simple Present (Passive)', formula:'am/is/are + V3', span:vp, glossId:'passive-voice'};
  if (T[0]==='MD' && (L[0]==='will'||L[0]==='shall') && N>=4 && L[1]==='have' && L[2]==='be' && T[3]==='VBG')
    return {name:'Future Perfect Continuous', formula:'will + have + been + V-ing', span:vp, glossId:'future-perfect-continuous'};
  if (T[0]==='MD' && (L[0]==='will'||L[0]==='shall') && N>=3 && L[1]==='have' && T[2]==='VBN')
    return {name:'Future Perfect', formula:'will + have + V3', span:vp, glossId:'future-perfect'};
  if (T[0]==='MD' && (L[0]==='will'||L[0]==='shall') && N>=3 && L[1]==='be' && T[2]==='VBG')
    return {name:'Future Continuous', formula:'will + be + V-ing', span:vp, glossId:'future-continuous'};
  if (T[0]==='MD' && (L[0]==='will'||L[0]==='shall') && N>=3 && L[1]==='be' && T[2]==='VBN')
    return {name:'Simple Future (Passive)', formula:'will + be + V3', span:vp, glossId:'passive-voice'};
  if (T[0]==='MD' && (L[0]==='will'||L[0]==='shall') && N>=2 && T[1]==='VB')
    return {name:'Simple Future', formula:'will + V1', span:vp, glossId:'simple-future'};
  if (L[0]==='do' && T[0]==='VBD' && N>=2 && T[1]==='VB')
    return {name:'Simple Past', formula:'did + V1 (untuk negatif/tanya)', span:vp, glossId:'negation'};
  if (L[0]==='do' && T[0]!=='VBD' && N>=2 && T[1]==='VB')
    return {name:'Simple Present', formula:'do/does + V1 (untuk negatif/tanya)', span:vp, glossId:'negation'};
  if (T[0]==='MD' && N>=3 && L[1]==='have' && T[2]==='VBN')
    return {name:'Modal Perfect', formula:'modal + have + V3', span:vp, glossId:'modal-construction'};
  if (T[0]==='MD' && N>=2 && T[1]==='VB')
    return {name:'Modal Construction', formula:'modal + V1', span:vp, glossId:'modal-construction'};
  if (L[0]==='be')
    return T[0]==='VBD'
      ? {name:'Simple Past (copula)', formula:'was/were + pelengkap', span:vp, glossId:'copular-verb'}
      : {name:'Simple Present (copula)', formula:'am/is/are + pelengkap', span:vp, glossId:'copular-verb'};
  if (T[0]==='VBD') return {name:'Simple Past', formula:'S + V2', span:vp, glossId:'simple-past'};
  if (T[0]==='VBP'||T[0]==='VBZ') return {name:'Simple Present', formula:'S + V1/V-s', span:vp, glossId:'simple-present'};
  if (T[0]==='VB') return {name:'Simple Present', formula:'S + V1', span:vp, glossId:'simple-present'};
  return null;
}
const detectGrammar = (tokens, spans) => spans.filter(s => s.type === 'VP').map(vp => detectTense(tokens, vp)).filter(Boolean);