package cera

import (
	"bytes"
	"text/template"

	"cera/log"

	"github.com/ceralena/go-restroute"
)

var indexTmpl = template.Must(template.New("indexTemplate").Parse(`<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>cera</title>
    <link href='/static/css/cera.css' rel='stylesheet' >
</head>
<body>
    <div id='main'>
        <p>loading...</p>
    </div>

    {{ if .Config.DevMode -}}
    <script src='/static/js/vendors.js' type='text/javascript'></script>
    <script src='/static/js/main.js' type='text/javascript'></script>
    {{ else -}}
	<script type='text/javascript'>
		{{ .InlineJS }}
	</script>
    {{ end -}}
    <script type='text/javascript'>
        main.ceraMain();
    </script>
    <script src="https://use.fontawesome.com/a0e4ea5fc2.js"></script>
</body>
</html>`))

func getIndexRoute(conf Config) func(req restroute.Request) (int, string) {
	return indexRoute{conf}.getIndex
}

type indexRoute struct {
	conf Config
}

func (ir indexRoute) getIndex(req restroute.Request) (int, string) {
	buf := new(bytes.Buffer)

	ctx := struct {
		InlineJS string
		Config   Config
	}{"", ir.conf}

	if !ir.conf.DevMode {
		// Inline the JS
		b, err := staticFileServer{ir.conf}.readStaticFile("js/main.js")
		if err != nil {
			log.F("error: %s", err)
			return 500, "failed to render index page"
		}
		ctx.InlineJS = string(b)
	}

	err := indexTmpl.Execute(buf, ctx)

	if err != nil {
		log.F("error: %s", err)
		return 500, "failed to render index page"
	}
	return 200, buf.String()
}
