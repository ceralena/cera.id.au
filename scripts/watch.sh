#!/bin/sh
set -ue

trap 'kill `jobs -p`' EXIT

npm run watch &
npm run start &

wait
