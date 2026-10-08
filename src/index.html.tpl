*{box-sizing:border-box}
:root{--bg:#fafafa;--fg:#222;--muted:#888;--line:#e2e2e2;--panel:#fff;--accent:#4a6ee0;--accent-bg:#eef3ff;--nav-h:68px;--ok:#2e8b57;--fail:#d9534f;--xfail:#e0a800}
[hidden]{display:none!important}
html{height:100%}
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:var(--bg);color:var(--fg);max-width:960px;margin:0 auto;min-height:100%;padding:11vh 16px calc(var(--nav-h) + 40px + env(safe-area-inset-bottom,0px));line-height:1.5;position:relative}
h1{font-size:20px;font-weight:600;margin:0 0 4px;text-align:center}
p.sub{color:var(--muted);font-size:13px;margin:0 0 20px;text-align:center}
.search-box{max-width:560px;margin:0 auto}
.search-box textarea{width:100%;padding:12px 16px;font-size:16px;border:1px solid var(--line);border-radius:10px;background:#fff;outline:none;resize:none;overflow-y:auto;font-family:inherit;line-height:1.5;min-height:48px;height:48px;display:block;transition:height .2s}
.search-box textarea:focus{border-color:#999}
.arrow-btn,.icon-btn,.lib-close,.textview-close{border:1px solid var(--line);background:#fff;cursor:pointer;padding:0;display:inline-flex;align-items:center;justify-content:center;font-family:inherit;transition:background .15s,border-color .15s,transform .1s}
.arrow-btn:active,.icon-btn:active,.textview-close:active{transform:scale(.95)}
.arrow-btn:focus,.icon-btn:focus,.textview-close:focus{outline:2px solid var(--accent);outline-offset:1px}
.arrow-btn{width:40px;height:40px;border-radius:10px;color:#333;line-height:1}
.arrow-btn:hover{background:#f0f0f0;border-color:#ccc}
.icon-btn{width:44px;height:44px;border-radius:50%}
.icon-btn:disabled{opacity:.45;cursor:not-allowed}
.icon-btn.reset{color:#d9534f;border-color:#f3c2c0;background:#fff5f5}
.icon-btn.reset:hover:not(:disabled){background:#ffe6e6;border-color:#d9534f}
.icon-btn.go{color:#222}
.icon-btn.go:hover:not(:disabled){background:#f0f0f0}
.actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:10px}
.actions-right{display:flex;gap:12px;margin-left:auto}
.loading{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:72px 16px 48px;text-align:center}
.loader{width:56px;height:56px;border-radius:50%;border:5px solid #e9e9e9;border-top-color:#1c1c1c;animation:loaderSpin .9s linear infinite}
@keyframes loaderSpin{to{transform:rotate(360deg)}}
.loading-text{font-size:13px;color:var(--muted);font-style:italic;letter-spacing:.01em}
#page-home.analyzing .tabs,#page-home.analyzing #output,#page-home.analyzing #legend,#page-home.analyzing .grid{display:none!important}
.tabs{display:flex;gap:6px;margin:56px 0 4px;padding-top:24px;border-top:1px solid var(--line);flex-wrap:wrap;justify-content:center}
.tabs button{padding:6px 12px;font-size:13px;cursor:pointer;border:1px solid var(--line);background:#fff;border-radius:8px;font-family:inherit}
.tabs button:hover{background:#f0f0f0}
.tabs button.active{background:#222;color:#fff;border-color:#222}
#output{margin-top:20px;font-size:19px;line-height:2.4;text-align:center}
.tok{padding:3px 7px;border-radius:6px;margin:2px;display:inline-block;cursor:pointer;border-bottom:1px solid transparent}
.tok:hover{border-bottom-color:#666}
.tok.cont-mid{margin-left:-2px;border-top-left-radius:0;border-bottom-left-radius:0;padding-left:3px}
.tok.selected{outline:2px solid #444;outline-offset:1px}
.status{margin-top:12px;text-align:center;font-size:13px;color:var(--muted);font-style:italic}
#legend{margin-top:14px;display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12px;color:#444;justify-content:center}
.legend-item{display:inline-flex;align-items:center;gap:5px}
.swatch{width:12px;height:12px;border-radius:3px;display:inline-block}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:14px 16px;font-size:13.5px}
.card h3{font-size:13px;font-weight:600;margin:0 0 10px;color:#333;text-transform:uppercase;letter-spacing:.04em}
.card .kv{display:grid;grid-template-columns:140px 1fr;gap:6px 10px}
.card .kv dt{color:var(--muted)}
.card .kv dd{margin:0}
.full{grid-column:1/-1}
.issue{padding:8px 10px;border-radius:8px;margin-bottom:8px;font-size:13px}
.issue.error{background:#ffe6e6;border-left:3px solid #d9534f}
.issue.warn{background:#fff5d6;border-left:3px solid #e0a800}
.issue.info{background:#eef6ff;border-left:3px solid #4a90e2}
.muted{color:var(--muted)}
.expl{margin:6px 0 0;color:#555;font-size:12.5px}
code{background:#f0f0f0;padding:1px 5px;border-radius:4px;font-size:12px}
.gloss-link{color:var(--accent);background:var(--accent-bg);padding:1px 6px;border-radius:5px;cursor:pointer;border:none;border-bottom:1px dashed #a4b6ef;font-weight:500;font-size:inherit;font-family:inherit;transition:background .15s}
.gloss-link:hover{background:#dfe7ff;border-bottom-color:var(--accent)}
.gloss-link:focus{outline:2px solid var(--accent);outline-offset:1px}
.view-more-btn{display:inline-block;margin-top:8px;padding:6px 14px;font-size:12.5px;cursor:pointer;border:1px solid var(--line);background:#fafafa;border-radius:8px;color:#333;font-family:inherit}
.view-more-btn:hover{background:#f0f0f0;border-color:#ccc}
.overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;z-index:1000;opacity:0;pointer-events:none;visibility:hidden;transition:opacity .18s,visibility .18s;overscroll-behavior:contain}
.overlay[data-open="true"]{opacity:1;pointer-events:auto;visibility:visible}
.lib-overlay{background:rgba(20,20,30,.45)}
.lib-modal{background:#fff;border-radius:14px;width:100%;max-width:1000px;height:min(90vh,820px);display:flex;flex-direction:column;box-shadow:0 18px 60px rgba(0,0,0,.28);overflow:hidden;transform:translateY(8px);transition:transform .18s}
.lib-overlay[data-open="true"] .lib-modal{transform:translateY(0)}
.lib-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--line);background:#fbfbfd}
.lib-header h2{font-size:16px;margin:0;font-weight:600}
.lib-header .lib-sub{font-size:12px;color:var(--muted);font-weight:400;margin-left:8px}
.lib-close{width:36px;height:36px;border-radius:50%;font-size:20px;line-height:1}
.lib-close:hover{background:#f2f2f2}
.lib-toolbar{padding:12px 20px;border-bottom:1px solid var(--line);background:#fff;display:flex;flex-direction:column;gap:10px}
.lib-search-wrap{position:relative}
.lib-search{width:100%;padding:10px 14px 10px 38px;border:1px solid var(--line);border-radius:10px;font-size:14px;background:#fafafa;outline:none;font-family:inherit}
.lib-search:focus{border-color:var(--accent);background:#fff}
.lib-search-wrap::before{content:"🔍";position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:14px;opacity:.55}
.lib-cats{display:flex;gap:6px;flex-wrap:wrap}
.lib-cat{padding:5px 12px;font-size:12.5px;border:1px solid var(--line);background:#fff;border-radius:20px;cursor:pointer;white-space:nowrap;font-family:inherit}
.lib-cat:hover{background:#f3f3f3}
.lib-cat.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.lib-content{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.lib-list-view,.lib-detail-view{flex:1;min-height:0;overflow-y:auto;padding:16px 20px 24px;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
.lib-list{display:flex;flex-direction:column;gap:8px}
.lib-item{text-align:left;width:100%;padding:12px 14px;border:1px solid var(--line);border-radius:10px;background:#fff;cursor:pointer;display:flex;flex-direction:column;gap:4px;font-family:inherit}
.lib-item:hover{border-color:#bcc7e8;background:#fafbff}
.lib-item:focus{outline:2px solid var(--accent);outline-offset:1px}
.lib-item .li-top{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.lib-item .li-name{font-weight:600;font-size:14px}
.lib-item .li-abbr{font-size:11.5px;color:#555;background:#f1f3f8;padding:1px 6px;border-radius:4px;font-family:ui-monospace,Menlo,monospace}
.lib-item .li-cat{font-size:10.5px;color:var(--accent);background:var(--accent-bg);padding:1px 8px;border-radius:20px;text-transform:uppercase;letter-spacing:.03em;margin-left:auto}
.lib-item .li-def{font-size:12.5px;color:#666}
.lib-empty{padding:32px 16px;text-align:center;color:var(--muted);font-size:13px}
.lib-empty strong{color:#333;display:block;margin-bottom:4px;font-size:14px}
.lib-back{padding:6px 12px;font-size:12.5px;border:1px solid var(--line);background:#fff;border-radius:8px;cursor:pointer;margin-bottom:14px;font-family:inherit}
.lib-back:hover{background:#f2f2f2}
.lib-detail h3{font-size:18px;margin:0 0 4px}
.lib-detail .ld-abbr{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#555;background:#f1f3f8;padding:2px 8px;border-radius:5px;margin-left:6px}
.lib-detail .ld-cat{font-size:11px;color:var(--accent);background:var(--accent-bg);padding:2px 10px;border-radius:20px;margin-left:6px;text-transform:uppercase;letter-spacing:.04em}
.lib-detail .ld-section{margin-top:14px}
.lib-detail .ld-section h4{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#666;margin:0 0 6px}
.lib-detail .ld-section p{margin:0;font-size:13.5px;line-height:1.65;color:#222}
.lib-detail .ld-formula{background:#f4f6fc;padding:10px 14px;border-radius:8px;font-family:ui-monospace,Menlo,monospace;font-size:13px;border-left:3px solid var(--accent)}
.lib-detail .ld-ex{background:#f7faf7;border-left:3px solid #66a06b;padding:10px 14px;border-radius:8px;margin-bottom:8px;font-size:13.5px}
.lib-detail .ld-ex .ex-sent{font-size:14px;margin-bottom:4px}
.lib-detail .ld-ex .ex-note{color:#555;font-size:12.5px}
.lib-detail .ld-ex u{text-decoration-color:var(--accent);text-decoration-thickness:2px;text-underline-offset:3px;font-weight:500}
.lib-detail .ld-related{display:flex;flex-wrap:wrap;gap:6px}
.lib-related-btn{padding:4px 12px;font-size:12.5px;border:1px solid var(--line);background:#fafafa;border-radius:20px;cursor:pointer;color:var(--accent);font-family:inherit}
.lib-related-btn:hover{background:var(--accent-bg);border-color:#c8d4f8}
.lib-detail .ld-simple{display:flex;gap:10px;align-items:flex-start;background:#fffbe6;border-left:3px solid #e0a800;padding:12px 14px;border-radius:8px;margin:12px 0 0;font-size:13.5px;line-height:1.65;color:#222}
.lib-detail .ld-simple .ld-simple-icon{font-size:18px;line-height:1;flex-shrink:0}
.lib-detail .ld-simple strong{color:#8a6d00;margin-right:4px}
.textview-overlay{background:#fff;display:block;padding:0;overflow-y:auto;-webkit-overflow-scrolling:touch}
.textview-close{position:fixed;top:calc(16px + env(safe-area-inset-top,0px));left:16px;width:44px;height:44px;border-radius:50%;color:#333;z-index:2;box-shadow:0 2px 10px rgba(0,0,0,.08)}
.textview-close:hover{background:#f2f2f2}
.textview-content{max-width:720px;margin:0 auto;min-height:100vh;padding:calc(84px + env(safe-area-inset-top,0px)) 24px 60px;font-size:18px;line-height:1.8;white-space:pre-wrap;word-break:break-word;color:#222}
.textview-content:empty::before{content:"(Tidak ada teks untuk ditampilkan)";color:var(--muted);font-style:italic}
.settings-page{max-width:640px;margin:0 auto}
.settings-page h2{font-size:18px;margin:0 0 12px}
.settings-card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:16px 18px;font-size:13.5px;margin-bottom:12px}
.settings-card h3{font-size:13px;font-weight:600;margin:0 0 8px;color:#333;text-transform:uppercase;letter-spacing:.04em}
.settings-card p{margin:0;color:#444}
.test-btn{padding:10px 18px;font-size:14px;background:#222;color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:inherit;font-weight:600}
.test-btn:hover{background:#000}
.test-btn:focus{outline:2px solid var(--accent);outline-offset:2px}
.test-summary{display:flex;gap:16px;flex-wrap:wrap;margin:12px 0;font-size:13px}
.test-summary .pill{padding:4px 12px;border-radius:20px;font-weight:600}
.test-summary .pill.ok{background:#e6f7ee;color:var(--ok)}
.test-summary .pill.fail{background:#ffe6e6;color:var(--fail)}
.test-summary .pill.xfail{background:#fff5d6;color:var(--xfail)}
.test-row{padding:10px 12px;border-radius:8px;margin-bottom:6px;font-size:12.5px;font-family:ui-monospace,Menlo,monospace;line-height:1.5}
.test-row.pass{background:#e6f7ee;border-left:3px solid var(--ok)}
.test-row.fail{background:#ffe6e6;border-left:3px solid var(--fail)}
.test-row.xfail{background:#fff5d6;border-left:3px solid var(--xfail)}
.test-row .sent{font-weight:600;color:#222}
.test-row .detail{color:#444;margin-top:4px;font-size:11.5px}
.test-row .tag{display:inline-block;padding:1px 6px;border-radius:4px;font-size:10px;font-weight:700;margin-right:6px;text-transform:uppercase;letter-spacing:.05em}
.test-row.pass .tag{background:var(--ok);color:#fff}
.test-row.fail .tag{background:var(--fail);color:#fff}
.test-row.xfail .tag{background:var(--xfail);color:#fff}
.bottom-nav{position:fixed;bottom:0;left:0;right:0;height:calc(var(--nav-h) + env(safe-area-inset-bottom,0px));padding-bottom:env(safe-area-inset-bottom,0px);background:#fff;border-top:1px solid var(--line);box-shadow:0 -6px 18px rgba(0,0,0,.06);display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;z-index:900;max-width:960px;margin:0 auto}
.nav-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;height:var(--nav-h);background:transparent;border:none;color:#666;font-family:inherit;font-size:11px;cursor:pointer;padding:0;-webkit-tap-highlight-color:transparent}
.nav-btn:hover{background:#f7f7f9;color:#333}
.nav-btn:active{background:#f0f0f2}
.nav-btn:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.nav-btn.active{color:var(--accent)}
.nav-btn.active svg{stroke:var(--accent)}
.page-hidden{display:none!important}
@media(max-width:640px){
  .grid{grid-template-columns:1fr}
  .card .kv{grid-template-columns:110px 1fr}
  body{padding-top:6vh}
  .overlay{padding:0}
  .lib-overlay{align-items:stretch}
  .lib-modal{max-width:100%;height:100%;border-radius:0}
  .lib-header{padding:14px 16px}
  .lib-toolbar,.lib-list-view,.lib-detail-view{padding-left:14px;padding-right:14px}
  .lib-item .li-cat{margin-left:0}
  .lib-detail h3{font-size:16px}
  :root{--nav-h:64px}
  .loading{padding:48px 16px 32px}
  .textview-content{font-size:17px;padding-left:20px;padding-right:20px}
}
@media(prefers-reduced-motion:reduce){
  .search-box textarea,.overlay,.lib-modal,.nav-btn,.arrow-btn,.icon-btn,.textview-overlay{transition:none!important}
  .loader{animation-duration:2.5s}
}