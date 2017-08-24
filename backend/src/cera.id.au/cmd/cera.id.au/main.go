package main

import "fmt"
import "net/http"
import "os"
import "strconv"
import "strings"

func fail(err error) {
	fmt.Fprintf(os.Stderr, "%s\n", err)
	os.Exit(1)
}

func validateHttpBind(bind string) error {
	spl := strings.SplitN(bind, ":", 2)

	if len(spl) != 2 {
		return fmt.Errorf("Invalid bind string: %s", bind)
	}

	_, err := strconv.Atoi(spl[1])
	if err != nil {
		return fmt.Errorf("Invalid port %q: %s", spl[1], err)
	}

	return nil
}

func main() {
	c, err := loadConfig()
	if err != nil {
		fail(err)
		return
	}

	// create the handler
	h := getHandler(c)

	// start the server
	err = http.ListenAndServe(c.HttpBind, h)
	if err != nil {
		fail(err)
	}
}
