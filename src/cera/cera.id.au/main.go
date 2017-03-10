package main

import "fmt"
import "os"

import "cera"
import "cera/util"

var helpStrings = []string{
	"-help",
	"--help",
	"-h",
}

func fatalIf(err error) {
	if err != nil {
		fatal(err)
	}
}

// fatal takes an error, prints the error, and exits with status code 1.
func fatal(err error) {
	fmt.Fprintf(os.Stderr, err.Error()+"\n")
	os.Exit(1)
}

const usage = `Usage: cera.id.au [-help|--help|-h]

Configuration is read from the environment. Available config vars:

* PORT (integer): specify the TCP port for the HTTP server; default: 8080
* STATICDIR (string): specify the static dir for assets relative to wd; default: static
`

// usage prints the usage and exists with status code 0.
func showUsage() {
	fmt.Fprintf(os.Stdout, usage)
	os.Exit(1)
}

func main() {
	if util.HasAnyString(os.Args, helpStrings) {
		showUsage()
	}

	// load the config
	config, err := cera.LoadConfigFromEnv()

	fatalIf(err)

	// prepare a server
	srv, err := cera.NewServer(config)

	fatalIf(err)

	// start the server
	err = srv.Run()

	fatalIf(err)
}
