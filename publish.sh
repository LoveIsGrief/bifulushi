#!/bin/bash
set -euo pipefail

# Make sure there are web-artifacts
ls web-ext-artifacts/*

zipfile="$(ls web-ext-artifacts)"

# Pin the extension to IPFS
ssh -o StrictHostKeyChecking=no \
    -p "$PIN_SSH_PORT" \
    "$PIN_SSH_USER@$PIN_SSH_HOST" \
    "$zipfile" < "web-ext-artifacts/$zipfile" | tee hash


