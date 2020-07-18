FROM \
    debian:buster-slim@sha256:d67632d49fcae559f86bd2b685c9159d0b1e799fd1d109dfbfccfab4ea773ba5 \
    AS base

FROM base as hugo-install

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get install -y ca-certificates curl

ENV HUGO_VERSION=0.74.2

RUN cd /tmp && \
    curl -sL \
    https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz > hugo.tar.gz && \
    tar xzf hugo.tar.gz

FROM base as dev

COPY --from=hugo-install /tmp/hugo /usr/local/bin/hugo
