/* ============================================================
   03-irregular.js
   Original section: 2. IRREGULAR VERBS
   ============================================================ */
const IRREG = {
  went:{lemma:'go',tag:'VBD',form:'V2'}, ate:{lemma:'eat',tag:'VBD',form:'V2'},
  saw:{lemma:'see',tag:'VBD',form:'V2'}, came:{lemma:'come',tag:'VBD',form:'V2'},
  took:{lemma:'take',tag:'VBD',form:'V2'}, gave:{lemma:'give',tag:'VBD',form:'V2'},
  got:{lemma:'get',tag:'VBD',form:'V2'}, found:{lemma:'find',tag:'VBD',form:'V2'},
  left:{lemma:'leave',tag:'VBD',form:'V2'}, said:{lemma:'say',tag:'VBD',form:'V2'},
  told:{lemma:'tell',tag:'VBD',form:'V2'}, thought:{lemma:'think',tag:'VBD',form:'V2'},
  brought:{lemma:'bring',tag:'VBD',form:'V2'}, wrote:{lemma:'write',tag:'VBD',form:'V2'},
  ran:{lemma:'run',tag:'VBD',form:'V2'}, spoke:{lemma:'speak',tag:'VBD',form:'V2'},
  broke:{lemma:'break',tag:'VBD',form:'V2'}, began:{lemma:'begin',tag:'VBD',form:'V2'},
  bought:{lemma:'buy',tag:'VBD',form:'V2'}, built:{lemma:'build',tag:'VBD',form:'V2'},
  held:{lemma:'hold',tag:'VBD',form:'V2'}, lost:{lemma:'lose',tag:'VBD',form:'V2'},
  won:{lemma:'win',tag:'VBD',form:'V2'}, fell:{lemma:'fall',tag:'VBD',form:'V2'},
  rose:{lemma:'rise',tag:'VBD',form:'V2'}, sang:{lemma:'sing',tag:'VBD',form:'V2'},
  swam:{lemma:'swim',tag:'VBD',form:'V2'}, taught:{lemma:'teach',tag:'VBD',form:'V2'},
  caught:{lemma:'catch',tag:'VBD',form:'V2'}, drove:{lemma:'drive',tag:'VBD',form:'V2'},
  flew:{lemma:'fly',tag:'VBD',form:'V2'}, drew:{lemma:'draw',tag:'VBD',form:'V2'},
  wore:{lemma:'wear',tag:'VBD',form:'V2'}, drank:{lemma:'drink',tag:'VBD',form:'V2'},
  slept:{lemma:'sleep',tag:'VBD',form:'V2'}, woke:{lemma:'wake',tag:'VBD',form:'V2'},
  sat:{lemma:'sit',tag:'VBD',form:'V2'}, stood:{lemma:'stand',tag:'VBD',form:'V2'},
  read:{lemma:'read',tag:'VBD',form:'V2',amb:['VBP','VBN']},
  gone:{lemma:'go',tag:'VBN',form:'V3'}, eaten:{lemma:'eat',tag:'VBN',form:'V3'},
  seen:{lemma:'see',tag:'VBN',form:'V3'}, come:{lemma:'come',tag:'VBN',form:'V3',amb:['VBP']},
  taken:{lemma:'take',tag:'VBN',form:'V3'}, made:{lemma:'make',tag:'VBN',form:'V3',amb:['VBD']},
  given:{lemma:'give',tag:'VBN',form:'V3'}, gotten:{lemma:'get',tag:'VBN',form:'V3'},
  written:{lemma:'write',tag:'VBN',form:'V3'}, run:{lemma:'run',tag:'VBN',form:'V3',amb:['VBP']},
  spoken:{lemma:'speak',tag:'VBN',form:'V3'}, broken:{lemma:'break',tag:'VBN',form:'V3'},
  begun:{lemma:'begin',tag:'VBN',form:'V3'}, fallen:{lemma:'fall',tag:'VBN',form:'V3'},
  risen:{lemma:'rise',tag:'VBN',form:'V3'}, sung:{lemma:'sing',tag:'VBN',form:'V3'},
  swum:{lemma:'swim',tag:'VBN',form:'V3'}, driven:{lemma:'drive',tag:'VBN',form:'V3'},
  flown:{lemma:'fly',tag:'VBN',form:'V3'}, drawn:{lemma:'draw',tag:'VBN',form:'V3'},
  worn:{lemma:'wear',tag:'VBN',form:'V3'}, drunk:{lemma:'drink',tag:'VBN',form:'V3'},
  woken:{lemma:'wake',tag:'VBN',form:'V3'}
};

const V2_EQ_V3 = new Set([
  'left','said','told','brought','bought','caught','taught','thought',
  'found','held','lost','won','sat','stood','built','got','slept','read'
]);