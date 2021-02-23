#!/bin/bash
set -euo pipefail

# Make sure there are signed web-artifacts
ls web-ext-artifacts/*.xpi

xpifile="$(ls web-ext-artifacts/*.xpi)"

# Pin the extension to IPFS
ssh -o StrictHostKeyChecking=no \
    -p "$PIN_SSH_PORT" \
    "$PIN_SSH_USER@$PIN_SSH_HOST" \
    "$xpifile" < "web-ext-artifacts/$xpifile" | tee hash


