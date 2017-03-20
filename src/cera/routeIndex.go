package cera

import (
	"bytes"
	"html/template"

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
    {{ end -}}
    <script src='/static/js/main.js' type='text/javascript'></script>
    <script type='text/javascript'>
        main.ceraMain();
    </script>
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

	err := indexTmpl.Execute(buf, struct{ Config }{ir.conf})

	if err != nil {
		return 500, ""
	}
	return 200, buf.String()
}
