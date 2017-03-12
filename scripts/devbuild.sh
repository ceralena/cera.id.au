#!/bin/sh
set -ue

backend() {
  echo 'building backend'
  gb build all
  GOPATH=`pwd`:`pwd`/vendor go vet cera/...
  GOPATH=`pwd`:`pwd`/vendor golint cera/...
}

frontend() {
  echo 'building frontend'
  npm run devbuild
  npm run lint
}

if [ $# == 0 ]; then
  backend
  frontend
  exit
fi

case "$1" in
  "-b")
      backend
      ;;
  "-f")
      frontend
      ;;
    *)
      echo "Invalid argument: $1" >&2
      exit 1
      ;;
  esac


