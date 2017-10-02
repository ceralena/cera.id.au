#!/bin/sh
set -ue

make build-prod-frontend
make build-prod-server

rm -rf frontend/node_modules
