SBT = sbt

SBT_OPTS = set offline := true

run-dev-server:
	$(SBT) "$(SBT_OPTS)" run

build-dist:
	$(SBT) dist
