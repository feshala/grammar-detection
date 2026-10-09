/* ============================================================
   24-corpus.js
   Original section: 23. TEST CORPUS
   Depends on: 05-09 (pipeline), 18 (mappings), 19 (glossary), 12 ($, esc)
   ============================================================ */
const TEST_CORPUS = [
  /* Kelompok A */
  { group: 'A', s: 'She goes to school every day.', tense: ['Simple Present'], noIssue: ['subject-verb-agreement'] },
  { group: 'A', s: 'They are playing football now.', tense: ['Present Continuous'] },
  { group: 'A', s: 'The book was written by John.', tense: ['Simple Past (Passive)'] },
  { group: 'A', s: 'He has been working since morning.', tense: ['Present Perfect Continuous'] },
  { group: 'A', s: 'She likes tea.', tense: ['Simple Present'], noIssue: ['subject-verb-agreement'] },
  { group: 'A', s: 'He makes cakes.', tense: ['Simple Present'] },
  { group: 'A', s: 'She takes the bus.', tense: ['Simple Present'] },
  { group: 'A', s: 'He lives in Jakarta.', tense: ['Simple Present'] },
  { group: 'A', s: 'She writes books.', tense: ['Simple Present'] },
  { group: 'A', s: 'It uses energy.', tense: ['Simple Present'] },
  { group: 'A', s: 'My sister is a nurse.', noIssue: ['subject-verb-agreement'] },
  { group: 'A', s: 'My mother cooks well.', noIssue: ['subject-verb-agreement'] },
  { group: 'A', s: 'My father works in a bank.', noIssue: ['subject-verb-agreement', 'noun'] },
  { group: 'A', s: 'I don\u2019t like tea.', noIssue: ['subject-verb-agreement'] },
  { group: 'A', s: 'She hasn\u2019t finished her work.', tense: ['Present Perfect'] },
  { group: 'A', s: "He hasn't finished yet.", tense: ['Present Perfect'] },
  { group: 'A', s: "They haven't arrived.", tense: ['Present Perfect'] },
  { group: 'A', s: "She'll call you tomorrow.", tense: ['Simple Future'] },
  { group: 'A', s: "There's a book on the table." },
  { group: 'A', s: "He's gone to school.", tense: ['Present Perfect'] },

  /* Kelompok B */
  { group: 'B', s: 'I goes to school.', issue: ['subject-verb-agreement'] },
  { group: 'B', s: 'I have went home.', issue: ['v3'] },
  { group: 'B', s: 'She is go to school.', issue: ['auxiliary-verb'] },
  { group: 'B', s: 'A apple is on the table.', issue: ['determiner'] },
  { group: 'B', s: 'He are happy.', issue: ['subject-verb-agreement'] },
  { group: 'B', s: 'I have eat rice.', issue: ['v3'] },

  /* Kelompok C */
  { group: 'C', s: 'asdf qwer zxcv', notAnalyzable: true },
  { group: 'C', s: 'Saya makan nasi', notAnalyzable: true },
  { group: 'C', s: 'The the the', notAnalyzable: true },

  /* Kelompok D */
  { group: 'D', s: 'She can goes home.', issue: ['modal-verb'] },
  { group: 'D', s: 'She can played yesterday.', issue: ['modal-verb'] },
  { group: 'D', s: 'She can eating now.', issue: ['modal-verb'] },
  { group: 'D', s: 'The children play outside.', noIssue: ['subject-verb-agreement'] },
  { group: 'D', s: 'People like music.', noIssue: ['subject-verb-agreement'] },
  { group: 'D', s: 'He goes home and she go to school.', issue: ['subject-verb-agreement'] },
  { group: 'D', s: 'I think that he go home.', issue: ['subject-verb-agreement'] },
  { group: 'D', s: 'Tom and Mary plays tennis.', issue: ['subject-verb-agreement'] },
  { group: 'D', s: 'The news is good.', noIssue: ['subject-verb-agreement'] },

  /* Kelompok E */
  { group: 'E', s: 'She should have gone home.', tense: ['Modal Perfect'] },
  { group: 'E', s: 'He must have left.', tense: ['Modal Perfect'] },
  { group: 'E', s: 'She is going to buy a car.', tense: ['Be going to (Future)'] },
  { group: 'E', s: 'The letter has been written.', tense: ['Present Perfect (Passive)'] },
  { group: 'E', s: 'The shop will be closed tomorrow.', tense: ['Simple Future (Passive)'] },
  { group: 'E', s: 'She is a teacher.', tense: ['Simple Present (copula)'] },

  /* Kelompok F */
  { group: 'F', s: 'The man wearing a hat is my uncle.', chunkNoOverlap: true },
  { group: 'F', s: 'Reading books is fun.', chunkNoOverlap: true },
  { group: 'F', s: 'She has not been reading.', tense: ['Present Perfect Continuous'] },
  { group: 'F', s: 'She is not going to buy a car.', tense: ['Be going to (Future)'] },
  { group: 'F', s: 'They will not have finished.', tense: ['Future Perfect'], chunkNoOverlap: true },

  /* Kelompok G */
  { group: 'G', s: 'Does she like coffee?', noIssue: ['subject-verb-agreement'] },
  { group: 'G', s: 'Why does she go there?', noIssue: ['subject-verb-agreement'] },
  { group: 'G', s: 'Where does he live?', noIssue: ['subject-verb-agreement'] },
  { group: 'G', s: 'Does he goes home?', issue: ['auxiliary-verb'] },
  { group: 'G', s: 'Can he swims?', issue: ['modal-verb'] },
  { group: 'G', s: 'Did she went home?', issue: ['auxiliary-verb'] },
  { group: 'G', s: 'She have gone.', issue: ['subject-verb-agreement'] },
  { group: 'G', s: 'They has gone.', issue: ['subject-verb-agreement'] },
  { group: 'G', s: 'She do not know.', issue: ['subject-verb-agreement'] },
  { group: 'G', s: 'I does not know.', issue: ['subject-verb-agreement'] },
  { group: 'G', s: 'I are happy.', issue: ['subject-verb-agreement'] },
  { group: 'G', s: 'They was late.', issue: ['subject-verb-agreement'] },
  { group: 'G', s: 'He were late.', issue: ['subject-verb-agreement'] },
  { group: 'G', s: "He don't want coffee.", issue: ['subject-verb-agreement'] },
  { group: 'G', s: 'The box of chocolates is expensive.', noIssue: ['subject-verb-agreement'] },
  { group: 'G', s: 'The books on the table are mine.', noIssue: ['subject-verb-agreement'] },
  { group: 'G', s: 'The list of items are long.', issue: ['subject-verb-agreement'] },
  { group: 'G', s: 'The books on the table is mine.', issue: ['subject-verb-agreement'] },
  { group: 'G', s: 'Reading is fun.', noIssue: ['subject-verb-agreement'] },
  { group: 'G', s: 'Swimming is good for health.', noIssue: ['subject-verb-agreement'] },
  { group: 'G', s: 'James likes music.', noIssue: ['subject-verb-agreement'] },
  { group: 'G', s: 'Mathematics is difficult.', noIssue: ['subject-verb-agreement'] },
  { group: 'G', s: "He hadn't left.", noIssue: ['v3'] },
  { group: 'G', s: "She hasn't left.", noIssue: ['v3'] },
  { group: 'G', s: "They haven't told us.", noIssue: ['v3'] },
  { group: 'G', s: 'I have not left.', noIssue: ['v3'] },

  /* Kelompok H */
  { group: 'H', s: 'I know when he comes.', noIssue: ['subject-verb-agreement'] },
  { group: 'H', s: 'I know when he come.', issue: ['subject-verb-agreement'] },
  { group: 'H', s: 'I know if he comes.', noIssue: ['subject-verb-agreement'] },
  { group: 'H', s: 'I know if he come.', issue: ['subject-verb-agreement'] },
  { group: 'H', s: 'She sings while she works.', noIssue: ['subject-verb-agreement', 'noun'] },
  { group: 'H', s: 'She sings while she work.', issue: ['subject-verb-agreement'] },
  { group: 'H', s: 'I will call you when I arrive.', noIssue: ['subject-verb-agreement'] },
  { group: 'H', s: 'Every day I go to school.', noIssue: ['subject-verb-agreement'] },
  { group: 'H', s: 'Every day I goes to school.', issue: ['subject-verb-agreement'] },
  { group: 'H', s: 'Last week she walks to work.', noIssue: ['subject-verb-agreement'] },
  { group: 'H', s: 'Last week she walk to work.', issue: ['subject-verb-agreement'] },
  { group: 'H', s: 'Yesterday she walks to school.', noIssue: ['subject-verb-agreement'] },
  { group: 'H', s: 'Yesterday she walk to school.', issue: ['subject-verb-agreement'] },
  { group: 'H', s: 'Yesterday, she walk to school.', issue: ['subject-verb-agreement'] },
  { group: 'H', s: 'In the morning she walks to work.', noIssue: ['subject-verb-agreement'] },
  { group: 'H', s: 'She has money left.', noIssue: ['v3'] },
  { group: 'H', s: 'She has left money.', noIssue: ['v3'] },
  { group: 'H', s: 'She has went home.', issue: ['v3'] },

  /* Kelompok I */
  { group: 'I', s: 'She goes to school every day.', verdict: 'clean' },
  { group: 'I', s: 'The professor presented glorious unfamiliar theories about quantum entanglement to skeptical colleagues yesterday.', verdict: 'abstain' },
  { group: 'I', s: 'A peculiar cat arrived.', verdict: 'hedged' },
  { group: 'I', s: 'asdf qwer zxcv', verdict: 'abstain' },
  { group: 'I', s: 'If I were you, I would go.', noIssue: ['subject-verb-agreement'] },
  { group: 'I', s: 'I were happy.', issue: ['subject-verb-agreement'] },
  { group: 'I', s: 'A lot of students are late.', noIssue: ['subject-verb-agreement'] },
  { group: 'I', s: 'A number of books are missing.', noIssue: ['subject-verb-agreement'] },
  { group: 'I', s: 'The rest of the cake is here.', noIssue: ['subject-verb-agreement'] },
  { group: 'I', s: 'A lot of students is late.', issue: ['subject-verb-agreement'] },
  { group: 'I', s: 'I suggest a plan.', noIssue: ['subject-verb-agreement'] },
  { group: 'I', s: 'She is friendly.', noIssue: ['subject-verb-agreement'] },
  { group: 'I', s: 'The order is ready.', noIssue: ['subject-verb-agreement'] },
  { group: 'I', s: 'Many informations are useful.', msgContains: ['uncountable'] },
  { group: 'I', s: 'Some advice is useful.', noIssue: ['subject-verb-agreement'] },
  { group: 'I', s: 'The books on the table is mine.', msgContains: ['The books on the table'] },

  /* Kelompok J */
  { group: 'J', s: 'The students who study hard pass the exam.', noIssue: ['subject-verb-agreement'] },
  { group: 'J', s: 'The students who study hard passes the exam.', issue: ['subject-verb-agreement'] },
  { group: 'J', s: 'The book which I bought yesterday was expensive.', noIssue: ['subject-verb-agreement'] },
  { group: 'J', s: 'The book which I bought yesterday were expensive.', issue: ['subject-verb-agreement'] },

  /* Kelompok K */
  { group: 'K', s: 'The study was surprising.', noIssue: ['subject-verb-agreement'] },
  { group: 'K', s: 'The results of the study was surprising.', issue: ['subject-verb-agreement'] },
  { group: 'K', s: 'The results of the study were surprising.', noIssue: ['subject-verb-agreement'] },
  { group: 'K', s: 'She studies English.', tense: ['Simple Present'], noIssue: ['subject-verb-agreement'] },
  { group: 'K', s: 'The reply was quick.', noIssue: ['subject-verb-agreement'] },
  { group: 'K', s: 'The supply is low.', noIssue: ['subject-verb-agreement'] },

  /* Kelompok L: W8 transfer patterns */
  { group: 'L', s: 'I like to reading books.', issue: ['transfer-to-ing'] },
  { group: 'L', s: 'I want to eating rice.', issue: ['transfer-to-ing'] },
  { group: 'L', s: 'She likes to reading.', issue: ['transfer-to-ing'] },
  { group: 'L', s: 'He is more taller than me.', issue: ['transfer-more-er'] },
  { group: 'L', s: 'I am agree.', issue: ['transfer-be-agree'] },
  { group: 'L', s: 'She is agree.', issue: ['transfer-be-agree'] },
  { group: 'L', s: 'We discuss about the topic.', issue: ['transfer-discuss-about'] },
  { group: 'L', s: 'She is married with him.', issue: ['transfer-married-with'] },
  { group: 'L', s: 'I like to read books.', noIssue: ['transfer-to-ing'] },
  { group: 'L', s: 'I want to eat rice.', noIssue: ['transfer-to-ing'] },
  { group: 'L', s: 'He is taller than me.', noIssue: ['transfer-more-er'] },
  { group: 'L', s: 'I agree.', noIssue: ['transfer-be-agree'] },
  { group: 'L', s: 'We discuss the topic.', noIssue: ['transfer-discuss-about'] },
  { group: 'L', s: 'She is married to him.', noIssue: ['transfer-married-with'] },

  /* Kelompok M: W9 fix regresi & kontradiksi */
  { group: 'M', s: 'The books which I bought yesterday were expensive.', noIssue: ['subject-verb-agreement'] },
  { group: 'M', s: 'The people who live next door are nice.', noIssue: ['subject-verb-agreement'] },
  { group: 'M', s: 'The number of students is increasing.', noIssue: ['subject-verb-agreement'] },
  { group: 'M', s: 'The number of students are increasing.', issue: ['subject-verb-agreement'] },
  { group: 'M', s: 'The group of students is waiting.', noIssue: ['subject-verb-agreement'] },
  { group: 'M', s: 'I look forward to meeting you.', noIssue: ['transfer-to-ing'] },
  { group: 'M', s: 'I am looking forward to meeting you.', noIssue: ['transfer-to-ing'] },
  { group: 'M', s: 'They are discussing about the plan.', issue: ['transfer-discuss-about'] },
  { group: 'M', s: 'I am agree.', issue: ['transfer-be-agree'], noIssue: ['auxiliary-verb'] },
  { group: 'M', s: 'Because I was tired, I went home.', noIssue: ['subject-verb-agreement'] },
  { group: 'M', s: 'I like to read books.', noIssue: ['transfer-to-ing'] },
  { group: 'M', s: 'She likes to reading.', issue: ['transfer-to-ing'] },

  /* Kelompok N: W10 */
  { group: 'N', s: 'One of the students is here.', noIssue: ['subject-verb-agreement'] },
  { group: 'N', s: 'One of the students are here.', issue: ['subject-verb-agreement'] },
  { group: 'N', s: 'One of my friends is a doctor.', noIssue: ['subject-verb-agreement'] },
  { group: 'N', s: 'One of my friends are a doctor.', issue: ['subject-verb-agreement'] },
  { group: 'N', s: 'I have lived here since 2 years.', issue: ['transfer-since-for'] },
  { group: 'N', s: 'I have lived here for 2 years.', noIssue: ['transfer-since-for'] },
  { group: 'N', s: 'She has been waiting since 3 hours.', issue: ['transfer-since-for'] },
  { group: 'N', s: 'She has been waiting for 3 hours.', noIssue: ['transfer-since-for'] },
  { group: 'N', s: 'I have known him since 2020.', noIssue: ['transfer-since-for'] },
  { group: 'N', s: 'I have known him since Monday.', noIssue: ['transfer-since-for'] },
  { group: 'N', s: 'Book is on table.', issue: ['missing-article'] },
  { group: 'N', s: 'I read book.', issue: ['missing-article'] },
  { group: 'N', s: 'I read a book.', noIssue: ['missing-article'] },
  { group: 'N', s: 'She is a teacher.', noIssue: ['missing-article'] },
  { group: 'N', s: 'I drink water.', noIssue: ['missing-article'] },
  { group: 'N', s: 'John is here.', noIssue: ['missing-article'] },
  { group: 'N', s: 'Books are here.', noIssue: ['missing-article'] },
  { group: 'N', s: 'School is fun.', noIssue: ['missing-article'] },

  /* Kelompok O: W11 data integrity */
  { group: 'O', s: '[data] 15 core glossary entries have simple field', dataCheck: (fails) => {
    const ids = ['noun','verb','v1','v2','v3','simple-present','simple-past','simple-future',
                 'present-continuous','present-perfect',
                 'transfer-to-ing','transfer-more-er','transfer-be-agree',
                 'transfer-discuss-about','transfer-married-with'];
    for (const id of ids) {
      if (!GRAMMAR_GLOSSARY[id]) fails.push(`glossary "${id}" tidak ada`);
      else if (!GRAMMAR_GLOSSARY[id].simple) fails.push(`glossary "${id}" tidak punya field simple`);
    }
  }},
  { group: 'O', s: '[data] simple field is short (≤250 chars) and non-empty', dataCheck: (fails) => {
    for (const [id, e] of Object.entries(GRAMMAR_GLOSSARY)) {
      if (!e.simple) continue;
      if (e.simple.length === 0) fails.push(`glossary "${id}".simple kosong`);
      if (e.simple.length > 250) fails.push(`glossary "${id}".simple terlalu panjang (${e.simple.length} char)`);
    }
  }},
  { group: 'O', s: '[data] TAG_TO_GLOSSARY values all exist', dataCheck: (fails) => {
    for (const [tag, gid] of Object.entries(TAG_TO_GLOSSARY)) {
      if (!GRAMMAR_GLOSSARY[gid]) fails.push(`TAG_TO_GLOSSARY["${tag}"] → "${gid}" tidak ada`);
    }
  }},
  { group: 'O', s: '[data] PHRASE_TO_GLOSSARY values all exist', dataCheck: (fails) => {
    for (const [type, gid] of Object.entries(PHRASE_TO_GLOSSARY)) {
      if (!GRAMMAR_GLOSSARY[gid]) fails.push(`PHRASE_TO_GLOSSARY["${type}"] → "${gid}" tidak ada`);
    }
  }},
  { group: 'O', s: '[data] FORM_TO_GLOSSARY values all exist', dataCheck: (fails) => {
    for (const [form, gid] of Object.entries(FORM_TO_GLOSSARY)) {
      if (!GRAMMAR_GLOSSARY[gid]) fails.push(`FORM_TO_GLOSSARY["${form}"] → "${gid}" tidak ada`);
    }
  }},

  /* Kelompok P: W12-A */
  { group: 'P', s: 'I like football.', noIssue: ['missing-article'] },
  { group: 'P', s: 'Football is fun.', noIssue: ['missing-article'] },
  { group: 'P', s: 'He plays football.', noIssue: ['missing-article'] },
  { group: 'P', s: 'Time flies.', noIssue: ['missing-article'] },
  { group: 'P', s: 'I love life.', noIssue: ['missing-article'] },
  { group: 'P', s: 'I read book.', issue: ['missing-article'] },
  { group: 'P', s: 'Book is on table.', issue: ['missing-article'] },
  { group: 'P', s: 'I read a book.', noIssue: ['missing-article'] },
  { group: 'P', s: 'I have lived here since two years ago.', noIssue: ['transfer-since-for'] },
  { group: 'P', s: 'I have lived here since 2 years.', issue: ['transfer-since-for'] },
  { group: 'P', s: 'The movie is exciting.', tense: ['Simple Present (copula)'], noIssue: ['subject-verb-agreement'] },
  { group: 'P', s: 'She is interested in history.', tense: ['Simple Present (copula)'], noIssue: ['subject-verb-agreement'] },

  /* Kelompok Q: W12-B multi-finite verb & missing copula */
  { group: 'Q', s: 'The book I bought were expensive.', issue: ['subject-verb-agreement'] },
  { group: 'Q', s: 'I think he are right.', issue: ['subject-verb-agreement'] },
  { group: 'Q', s: 'I think he is right.', noIssue: ['subject-verb-agreement'] },
  { group: 'Q', s: 'I think she is nice.', noIssue: ['subject-verb-agreement'] },
  { group: 'Q', s: 'She very beautiful.', msgContains: ['butuh "be"'] },
  { group: 'Q', s: 'My father engineer.', msgContains: ['butuh "be"'] },
  { group: 'Q', s: 'He tall.', msgContains: ['butuh "be"'] },
  { group: 'Q', s: 'She is very beautiful.', noIssue: ['subject-verb-agreement'] },
  { group: 'Q', s: 'My father is an engineer.', noIssue: ['subject-verb-agreement'] },
  { group: 'Q', s: 'He is tall.', noIssue: ['subject-verb-agreement'] },
  { group: 'Q', s: 'asdf qwer zxcv', verdict: 'abstain' },

  /* Kelompok R: post-audit konsistensi (leksikon + regresi verba/nomina) */
  { group: 'R', s: '[data] LEX: kata yang ter-reg >1 kali hanya yang ada di allowlist', dataCheck: (fails) => {
    // reg() menimpa LEX[w]; entri terakhir menang. Allowlist = pendaftaran ganda yang sudah ditinjau.
    const known = new Set([
      // penyempurnaan disengaja (entri akhir menambah amb)
      'boring', 'tired', 'study',
      // dinetralkan handler khusus di tagOne (05-tagger.js) sebelum lookup LEX
      'like', 'early',
      // MASALAH TERBUKA: entri akhir menimpa tag lain; perlu aturan konteks di tagger
      'may', 'clean', 'kind', 'only', 'past', 'second', 'yet'
    ]);
    for (const [w, n] of Object.entries(REG_COUNT)) {
      if (n > 1 && !known.has(w)) fails.push(`LEX "${w}" ter-reg ${n}x (entri akhir menimpa yang awal)`);
    }
    for (const w of known) {
      if (!(REG_COUNT[w] > 1)) fails.push(`allowlist usang: "${w}" tidak lagi ter-reg ganda; hapus dari allowlist`);
    }
  }},
  { group: 'R', s: 'He works in a school.', noIssue: ['noun'] },
  { group: 'R', s: 'She waters the plants every day.', noIssue: ['noun'] },
  { group: 'R', s: 'These advices are useful.', issue: ['noun'] },
  { group: 'R', s: 'I need some informations.', issue: ['noun'] },
  { group: 'R', s: 'He can answer the question.', tense: ['Modal Construction'], noIssue: ['missing-article'] },
  { group: 'R', s: 'The answer is correct.', tense: ['Simple Present (copula)'] }
];

function runOneTest(tc) {
  const tokens = tokenize(tc.s);
  tagAll(tokens);
  const spans = chunk(tokens);
  const grammar = detectGrammar(tokens, spans);
  const clauses = splitClauses(tokens);
  const structures = clauses.map(c => {
    const s = analyzeStructure(tokens, spans, c.start, c.end);
    s.grammar = grammar.filter(g => g.span.start >= c.start && g.span.end <= c.end);
    return s;
  });
  const issues = validate(tokens, structures);

  const tenseNames = grammar.map(g => g.name);
  const issueIds = issues.filter(i => i.level !== 'info').map(i => i.glossId);
  const infoMsgs = issues.filter(i => i.level === 'info').map(i => i.msg);

  const fails = [];

  if (tc.dataCheck) tc.dataCheck(fails);

  if (tc.chunkNoOverlap) {
    const sorted = spans.slice().sort((a, b) => a.start - b.start);
    for (let k = 1; k < sorted.length; k++) {
      if (sorted[k].start <= sorted[k-1].end) {
        fails.push(`chunk overlap: [${sorted[k-1].start},${sorted[k-1].end}] vs [${sorted[k].start},${sorted[k].end}]`);
        break;
      }
    }
  }

  if (tc.tense) {
    for (const exp of tc.tense) {
      const match = tenseNames.some(n => n === exp);
      if (!match) fails.push(`tense "${exp}" tidak ketemu (exact); dapat [${tenseNames.join(', ') || '-'}]`);
    }
  }
  if (tc.issue) {
    for (const exp of tc.issue) {
      if (!issueIds.includes(exp)) fails.push(`issue "${exp}" tidak terdeteksi; dapat [${issueIds.join(', ') || '-'}]`);
    }
  }
  if (tc.noIssue) {
    for (const exp of tc.noIssue) {
      if (issueIds.includes(exp)) fails.push(`false positive: "${exp}" muncul`);
    }
  }
  if (tc.notAnalyzable) {
    const has = infoMsgs.some(m => m.toLowerCase().includes('tidak dapat dianalisis'));
    if (!has) fails.push(`tidak dapat low-confidence message; dapat: "${infoMsgs.join(' | ').slice(0, 80)}"`);
  }
  if (tc.verdict) {
    const info = issues.find(i => i.level === 'info');
    const v = info && info.verdict;
    if (v !== tc.verdict) fails.push(`verdict "${tc.verdict}" tidak ketemu; dapat "${v || '-'}"`);
  }
  if (tc.msgContains) {
    const all = issues.map(i => i.msg).join(' | ');
    for (const frag of tc.msgContains) {
      if (!all.includes(frag)) fails.push(`pesan tidak memuat "${frag}"; dapat: "${all.slice(0,80)}"`);
    }
  }

  return { tc, tenseNames, issueIds, infoMsgs, fails, pass: fails.length === 0 };
}

function renderTestResults(results) {
  const pass = results.filter(r => r.pass).length;
  const xfailPass = results.filter(r => !r.pass && r.tc.xfail).length;
  const fail = results.filter(r => !r.pass && !r.tc.xfail).length;
  const total = results.length;

  let html = `<div class="test-summary">
    <span class="pill ok">✓ ${pass} pass</span>
    ${xfailPass ? `<span class="pill xfail">◐ ${xfailPass} xfail (known)</span>` : ''}
    ${fail ? `<span class="pill fail">✗ ${fail} fail</span>` : ''}
    <span class="pill" style="background:#f0f0f0;color:#444">total: ${total}</span>
  </div>`;

  const interesting = results.filter(r => !r.pass || (r.pass && r.tc.xfail));
  if (!interesting.length) {
    html += `<p style="font-size:13px;color:#444">Semua test pass sesuai harapan. 🎉</p>`;
  } else {
    interesting.forEach(r => {
      const cls = r.pass && r.tc.xfail ? 'pass' : (r.tc.xfail ? 'xfail' : 'fail');
      const tag = r.pass && r.tc.xfail ? 'X-PASS' : (r.tc.xfail ? 'XFAIL' : 'FAIL');
      html += `<div class="test-row ${cls}">
        <span class="tag">${tag}</span>
        <span class="sent">"${esc(r.tc.s)}"</span>
        <div class="detail">
          tense=[${r.tenseNames.join(', ') || '-'}] · issues=[${r.issueIds.join(', ') || '-'}]<br>
          ${r.tc.xfail ? `<em style="color:#8a6d00">Diketahui gagal: ${esc(r.tc.xfail)}</em><br>` : ''}
          ${r.fails.length ? `<strong>${r.fails.map(esc).join(' · ')}</strong>` : 'sesuai harapan'}
        </div>
      </div>`;
    });
  }
  $('test-panel').innerHTML = html;
}

function runTests() {
  const results = TEST_CORPUS.map(runOneTest);
  renderTestResults(results);
  $('test-panel').hidden = false;
  const pass = results.filter(r => r.pass).length;
  const fail = results.filter(r => !r.pass && !r.tc.xfail).length;
  console.log(`[TEST] ${pass}/${results.length} pass, ${fail} real failures`);
}
