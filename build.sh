#!/usr/bin/env bash
# VPS / CI build entry — fetch count is logged before Astro build so journalctl
# shows whether the new WordPress post was visible to the build.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "[build] starting $(date -u +%Y-%m-%dT%H:%M:%SZ)"

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

node scripts/count-posts.mjs

echo "[build] npm run build"
npm run build

echo "[build] finished $(date -u +%Y-%m-%dT%H:%M:%SZ)"
