#!/bin/bash
set -euo pipefail

# Make sure there are signed web-artifacts
ls web-ext-artifacts/*.xpi

xpifile="$(ls web-ext-artifacts/*.xpi)"

version=$(echo "
  console.log((`cat manifest.json`).version)
" | node)
addonID=$(echo "
  console.log((`cat manifest.json`).applications.gecko.id)
" | node)

echo "version: $version"
echo "addonID: $addonID"

# Pin the extension to IPFS
ssh -o StrictHostKeyChecking=no \
    -p "$PIN_SSH_PORT" \
    "$PIN_SSH_USER@$PIN_SSH_HOST" \
    "$addonID" "$version" < "web-ext-artifacts/$xpifile" | tee hash


