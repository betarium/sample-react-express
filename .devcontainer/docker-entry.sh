#!/bin/sh

git config --global --add safe.directory /workspace

cd /workspace/front

pnpm install --frozen-lockfile

cd /workspace/back

pnpm install --frozen-lockfile

cd /workspace

while sleep 1000; do :; done
