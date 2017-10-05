name := "cera.id.au"
organization := "au.id.cera"

// rather than have to commit a change to this file to cut a version, it's
// modified at build-time by the scripts/builder file, before running the sbt
// dist task
version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.3"

// enable cached dependency resolution to support offline development
updateOptions := updateOptions.value.withCachedResolution(true)

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test

// google api services compute
libraryDependencies += "com.google.apis" % "google-api-services-compute" % "v1-rev157-1.22.0"

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "au.id.cera.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "au.id.cera.binders._"
