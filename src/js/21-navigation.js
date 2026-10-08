/* ============================================================
   21-navigation.js
   Original section: 20. PAGE NAVIGATION
   Depends on: $ (12); openGrammarLibrary (20)
   ============================================================ */
let currentPage = 'home';
function setActiveNavButton(page) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
}
function switchPage(page) {
  if (page === currentPage) return;
  currentPage = page;
  const homeEl = $('page-home'), settingsEl = $('page-settings');
  if (page === 'home') { homeEl.classList.remove('page-hidden'); settingsEl.classList.add('page-hidden'); }
  else if (page === 'settings') { homeEl.classList.add('page-hidden'); settingsEl.classList.remove('page-hidden'); }
  setActiveNavButton(page);
  window.scrollTo({top:0, behavior: 'instant' in window ? 'instant' : 'auto'});
}
function initBottomNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page === 'library') { openGrammarLibrary(); return; }
      switchPage(page);
    });
  });
}