#!/usr/bin/env bash
# build.sh — assemble src/ into single-file GD
set -euo pipefail
cd "$(dirname "$0")"

TPL=src/index.html.tpl
CSS=src/styles.css
OUT=GD

[[ -f "$TPL" ]] || { echo "Missing $TPL" >&2; exit 1; }
[[ -f "$CSS" ]] || { echo "Missing $CSS" >&2; exit 1; }

python3 - "$TPL" "$CSS" "$OUT" <<'PY'
import sys, pathlib, glob

tpl_path, css_path, out_path = sys.argv[1], sys.argv[2], sys.argv[3]

tpl = pathlib.Path(tpl_path).read_text(encoding='utf-8')
css = pathlib.Path(css_path).read_text(encoding='utf-8')

js_files = sorted(glob.glob('src/js/*.js'))
if not js_files:
    sys.exit('No JS files found in src/js/')

if tpl.count('{{CSS}}') != 1:
    sys.exit('Template must contain exactly one {{CSS}} placeholder')
if tpl.count('{{JS}}') != 1:
    sys.exit('Template must contain exactly one {{JS}} placeholder')

js = '\n'.join(pathlib.Path(f).read_text(encoding='utf-8') for f in js_files)

result = tpl.replace('{{CSS}}', css).replace('{{JS}}', js)

pathlib.Path(out_path).write_text(result, encoding='utf-8')
print(f'Built {out_path}  ({len(result)} bytes, {result.count(chr(10)) + 1} lines)')
PY