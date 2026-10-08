#!/usr/bin/env bash
# serve.sh — start a local HTTP server for dev.html
# Chrome and Edge block <script src="relative.js"> from file://.
# This serves the repo root so src/js/*.js resolve normally.
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-8000}"
if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 not found. Alternative: use 'npx serve' or 'php -S localhost:$PORT'." >&2
  exit 1
fi
echo "Grammar Detection — dev server"
echo "Open: http://localhost:$PORT/dev.html"
echo "Stop: Ctrl+C"
echo
exec python3 -m http.server "$PORT"