##
## base image
##
FROM \
    debian:buster-slim@sha256:d67632d49fcae559f86bd2b685c9159d0b1e799fd1d109dfbfccfab4ea773ba5 \
    AS base

RUN apt-get update && \
  apt-get install -y ca-certificates curl && \
  rm -rf /var/lib/apt/lists

FROM base AS dev-base

RUN apt-get update && \
    apt-get install -y git

##
## install hugo
##
FROM base as hugo

ENV HUGO_VERSION=0.74.2

RUN cd /tmp && \
    curl -sL \
    https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz > hugo.tar.gz && \
    tar xzf hugo.tar.gz && \
    mv hugo /usr/local/bin/hugo && \
    rm hugo.tar.gz

##
## node
##
FROM \
    node:14.5-buster-slim@sha256:e13044e1cd4f1e2a21d054c8a86350ff29bd1eb568a1200fef8d1d3cd8ee36bb \
    AS node

##
## build the webpack app
##
FROM node AS webpack-build

WORKDIR /work

# we run yarn install seperately before copying src in to increase the chance of having a warm cache for this step
COPY package.json webpack.config.js yarn.lock ./
RUN yarn

COPY src src
RUN yarn build

##
## build the hugo site
##
FROM hugo AS hugo-build

WORKDIR /work

COPY . .

COPY --from=webpack-build /work/static/assets static/assets

RUN hugo --buildDrafts

##
## download caddy
##
FROM base AS caddy-download
WORKDIR /work

ENV CADDY_VERSION=2.1.1

RUN \
    curl -sL -O https://github.com/caddyserver/caddy/releases/download/v2.1.1/caddy_2.1.1_linux_amd64.tar.gz && \
    tar xzf caddy_${CADDY_VERSION}_linux_amd64.tar.gz

##
## final build step: pull in caddy and the built hugo site
##
FROM base AS final

EXPOSE 8080
CMD ["caddy", "run"]

COPY --from=caddy-download /work/caddy /usr/local/bin/caddy

RUN useradd \
  --no-log-init --system --create-home --home-dir /home/cera-id-au \
  --uid 1000 \
  cera-id-au
VOLUME /home/cera-id-au
WORKDIR /home/cera-id-au
USER 1000:1000
COPY Caddyfile .

COPY --from=hugo-build /work/public /srv/cera-id-au
