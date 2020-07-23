# cera.id.au

This repository contains the source for [cera.id.au](https://cera.id.au/).

This is a work in progress as of 2020-07 and is not yet deployed.

The site is built with [`hugo`](http://gohugo.io), packaged into a Docker container and served up with [`caddy`](https://caddyserver.com).

- [cera.id.au](#ceraidau)
  - [Development](#development)
    - [Build the docker image](#build-the-docker-image)
    - [Run the dev server](#run-the-dev-server)
    - [Dev shell](#dev-shell)
  - [Deployment](#deployment)
    - [Deploying Manually](#deploying-manually)

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

## Deployment

There's a [`Cloud Build`](https://console.cloud.google.com/cloud-build/dashboard) GitHub trigger that submits a build then deploys to [`Cloud Run`](https://console.cloud.google.com/run?folder=&organizationId=&project=cera-infra).

### Deploying Manually

Configure `google-cloud-sdk` and enable the Cloud Build API:

```sh
gcloud components install beta
gcloud auth application-default login
gcloud config set project "${GCP_PROJECT}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
```

Next, follow the instructions [here](https://cloud.google.com/cloud-build/docs/securing-builds/configure-access-for-cloud-build-service-account) to set up IAM access for the Cloud Build and Cloud Run service accounts.

And finally:

```sh
gcloud config set run/region asia-east1
```

Then do something like this:
```

gcloud builds submit \
  --tag asia.gcr.io/"${GCP_PROJECT}"/cera.id.au

gcloud run deploy ceraidau \
  --image asia.gcr.io/"${GCP_PROJECT}"/cera.id.au \
  --region "${GCP_REGION}" \
  --platform managed \
  --allow-unauthenticated
  ```
