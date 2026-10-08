/* ============================================================
   18-mappings.js
   Original section: 17. MAPPING DICTIONARIES
   ============================================================ */
const TAG_TO_GLOSSARY = {
  NN:'noun', NNS:'noun', NNP:'noun',
  PRP:'pronoun', 'PRP$':'pronoun', WP:'pronoun', 'WP$':'pronoun', WDT:'pronoun', WRB:'adverb',
  VB:'verb', VBD:'verb', VBG:'verb', VBN:'verb', VBP:'verb', VBZ:'verb',
  MD:'modal-verb', JJ:'adjective', JJR:'adjective', JJS:'adjective',
  RB:'adverb', DT:'determiner', IN:'preposition', CC:'conjunction',
  TO:'infinitive-marker', CD:'numeral', UH:'interjection', PUNCT:'punctuation'
};
const PHRASE_TO_GLOSSARY = {
  NP:'noun-phrase', VP:'verb-phrase', PP:'prepositional-phrase',
  AdjP:'adjective-phrase', AdvP:'adverb-phrase',
  InfP:'infinitive-phrase', GerP:'gerund-phrase', PartP:'participial-phrase'
};
const FORM_TO_GLOSSARY = {'V1':'v1','V2':'v2','V3':'v3','V-ing':'v-ing','V-s':'v-s'};