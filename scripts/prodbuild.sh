#!/bin/sh
set -ue

# backend
yarn
npm run prodbuild

# delete node_modules and install prod dependencies only
rm -rf node_modules
yarn --production --ignore-optional
