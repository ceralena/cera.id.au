# cera.id.au

The source for https://cera.id.au

## Building

For dev, for now you need to run these concurrently:

	npm run watch
	npm run start

For prod:

	./scripts/prodbuild.sh

For prod with upload:

  git tag $tag
  git push origin $tag
  builder build cera.id.au ./scripts/builder $tag
