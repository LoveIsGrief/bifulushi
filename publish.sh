#!/bin/bash
set -euo pipefail

# Make sure there are web-artifacts
ls web-ext-artifacts/*

zipfile="$(ls web-ext-artifacts)"

ssh -o StrictHostKeyChecking=no \
    "$PIN_SSH_USER@$PIN_SSH_HOST" \
    "$zipfile" < "web-ext-artifacts/$zipfile" | tee hash


