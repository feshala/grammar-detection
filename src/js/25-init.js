/* ============================================================
   25-init.js
   Original section: 24. INIT
   Depends on: $ (12); runTests (24);
               initLibraryEvents (20); initBottomNav (21); initTextViewEvents (16);
               autoGrowInput (14); analyze (17)
   ============================================================ */
const tcEl = $('target-count');
if (tcEl) tcEl.textContent = TEST_CORPUS.length + ' pass · 0 fail · 0 xfail';

$('run-tests').addEventListener('click', runTests);
initLibraryEvents();
initBottomNav();
initTextViewEvents();
autoGrowInput();
analyze({ silent: true });