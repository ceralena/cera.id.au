# cera.id.au

The source for <https://cera.id.au>.

## Building

For dev, run this command:

	$ make run-dev-server

For prod with upload:

	$ git tag $tag
	$ git push origin $tag
	$ builder build cera.id.au ./scripts/builder $tag

## Development

Install [sbt](https://scala-sbt.org).

To run:

	$ sbt run

### Without an internet connection

Add this in build.sbt:

	updateOptions := updateOptions.value.withCachedResolution(true)

Then run

	$ sbt clean compile

This will store the resolved dependency graph locally in
`~/.sbt/$version/dependency`.

Finally, set the offline option in the sbt runtime:

	$ sbt "set offline := true" run

Or:

	$ sbt
	> set offline := true
	> run

Based on this stack overflow question:

<https://stackoverflow.com/questions/24395307/working-offline-with-sbt-and-snapshot-dependencies>
