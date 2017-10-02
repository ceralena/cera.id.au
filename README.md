# cera.id.au

The source for https://cera.id.au

## Building

For dev, run this command:

	make run-dev-server

For prod with upload:

  git tag $tag
  git push origin $tag
  builder build cera.id.au ./scripts/builder $tag
