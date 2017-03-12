package cera

import (
	"encoding/json"
	"io"
	"net/http"
	"path/filepath"

	"cera/log"

	"github.com/ceralena/go-restroute"
)

func getRoutes(conf Config) (http.Handler, error) {
	m := restroute.Map{
		`/static/(?P<file_path>.*)$`: {
			"GET": staticFileServer{conf}.getStaticFile,
		},

		// catch-all
		`/`: {
			"GET": htmlR(getIndex),
		},
	}

	return m.Compile()
}

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

func getIndex(req restroute.Request) (int, string) {
	return 200, `<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>cera</title>
</head>
<body>
    <div id='main'>
        <p>loading...</p>
    </div>

    <script src='/static/js/vendors.js' type='text/javascript'></script>
    <script src='/static/js/main.js' type='text/javascript'></script>
    <script type='text/javascript'>
        main.ceraMain();
    </script>
</body>
</html>`
}

type staticFileServer struct {
	conf Config
}

func (sfs staticFileServer) getStaticFile(req restroute.Request) {
	path := filepath.Join(sfs.conf.StaticDir, req.Params["file_path"])

	http.ServeFile(req.W, req.R, path)
}
