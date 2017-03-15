package cera

import (
	"encoding/json"
	"io"
	"net/http"

	"cera/log"

	"github.com/ceralena/go-restroute"
)

func getRoutes(conf Config) (http.Handler, error) {
	m := restroute.Map{
		`/static/(?P<file_path>.*)$`: {
			"GET": getStaticRoute(conf),
		},

		// catch-all
		`/`: {
			"GET": htmlR(getIndex),
		},
	}

	return m.Compile()
}

// htmlR is a route helper for a HTML response.
func htmlR(fn func(req restroute.Request) (int, string)) func(req restroute.Request) {
	return func(req restroute.Request) {
		statusCode, htmlOutput := fn(req)

		req.W.WriteHeader(statusCode)
		_, err := io.WriteString(req.W, htmlOutput)
		if err != nil {
			log.F("Failed writing html of length %d with status code %d: %s", len(htmlOutput), statusCode, err)
		}
	}
}

// jsonR is a route helper for a JSON response.
func jsonR(fn func(req restroute.Request) (int, interface{})) func(req restroute.Request) {
	return func(req restroute.Request) {
		statusCode, jsonOutput := fn(req)

		req.W.WriteHeader(statusCode)
		enc := json.NewEncoder(req.W)
		err := enc.Encode(jsonOutput)
		if err != nil {
			log.F("Failed encoding or writing json with status code %d: %s", statusCode, err)
		}
	}
}
