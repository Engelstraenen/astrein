#!/bin/zsh
# gh-pages als EIN Commit aus main:site bauen (V2.77/V2.78), nie subtree split.
set -e
cd "$(dirname "$0")/.."
touch site/.nojekyll
git add -A site && git commit -qm "Seite aktualisiert" || true
T=$(git rev-parse "HEAD:site")
C=$(git commit-tree "$T" -m pages)
[ ${#C} -eq 40 ] || { echo "Commit-Hash ungültig: $C"; exit 1; }
git -c http.postBuffer=524288000 push -q origin main
git -c http.postBuffer=524288000 push -q -f origin "${C}:refs/heads/gh-pages"
echo "gh-pages = $C"
