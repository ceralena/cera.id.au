# cera.id.au

This repository contains the source for [cera.id.au](https://cera.id.au/).

This is a work in progress as of 2020-07 and is not yet deployed.

The site is built with [`hugo`](http://gohugo.io), packaged into a Docker container and served up with [`caddy`](https://caddyserver.com).

- [cera.id.au](#ceraidau)
  - [Development](#development)
    - [Build the docker image](#build-the-docker-image)
    - [Run the dev server](#run-the-dev-server)
    - [Dev shell](#dev-shell)

## Development

Dependencies:

- `docker`
- `docker-compose`

### Build the docker image

```sh
auto/image/build
```

Or to test it locally:

```
auto/image/build-and-run
```

Then visit <http://localhost:8080/>.

### Run the dev server

```sh
auto/start
```

Visit <http://localhost:1313/>.

### Dev shell

The hugo service:

```sh
auto/hugo
```

The node / wepback service:

```sh
auto/node-dev
```
