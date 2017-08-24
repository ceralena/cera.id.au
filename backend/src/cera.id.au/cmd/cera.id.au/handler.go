package main

import (
	"bytes"
	"html/template"
	"io"
	"io/ioutil"
	"net/http"
	"path/filepath"
)

import "github.com/ceralena/go-restroute"

func getHandler(c Config) http.Handler {
	rm := restroute.Map{
		`^/$`: {
			"GET": indexHandler{c}.getIndex,
		},
		`^/static/(?P<file_path>.*)$`: {
			"GET": getStaticRoute(c),
		},
		//`.*`: {
		//		"GET": getWildcard,
		//	},
	}

	return rm.MustCompile()
}

func sendHtml(req restroute.Request, h string) {
	io.WriteString(req.W, h)
}

func sendHtmlBytes(req restroute.Request, b []byte) {
	req.W.Write(b)
}

type indexHandler struct {
	Config
}

func (ih indexHandler) getIndex(req restroute.Request) {
	tpl := template.Must(template.New("index").Parse(`<!DOCTYPE html>
    <html lang="EN-AU">
    <head>
        <link href='/static/css/cera.css?{{.AppVersion}}' rel='stylesheet' >
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>cera</title>
    </head>
    <body>
        <h1>cera</h1>
        <p>software engineer | amateur ecologist | revolutionary socialist | synth maker | trans woman</p>
        <p>Hobart, Tasmania</p>

	<div class='contact'>
	  <i class='fa fa-transgender' aria-hidden='true'></i>
	  <a href='mailto:ceralena.davies@gmail.com'><i class='fa fa-envelope-o' aria-hidden='true'></i></a>
	  <a href='https://github.com/ceralena'><i class='fa fa-github' aria-hidden='true'></i></a>
	  <a href='https://www.instagram.com/cerales'><i class='fa fa-instagram' aria-hidden='true'></i></a>
	  <a href='http://soundcloud.com/cerales'><i class='fa fa-soundcloud' aria-hidden='true'></i></a>
	</div>
    </body>
    </html>`))

	buf, err := execTpl(tpl, ih.Config)

	if err != nil {
		panic(err) // TODO
	}

	sendHtmlBytes(req, buf)
}

func getWildcard(req restroute.Request) {
	http.Redirect(req.W, req.R, "/", 303)
}

func getStaticRoute(conf Config) func(req restroute.Request) {
	return staticFileServer{conf}.getStaticFile
}

type staticFileServer struct {
	conf Config
}

func (sfs staticFileServer) getStaticFile(req restroute.Request) {
	path := sfs.fullFilePath(req.Params["file_path"])

	// TODO(cera) - check that the path is a file, not a dir

	http.ServeFile(req.W, req.R, path)
}

func (sfs staticFileServer) fullFilePath(filePath string) string {
	// TODO(cera) - do not allow '.' and '..' traversal
	return filepath.Join(sfs.conf.StaticDir, filePath)
}

func (sfs staticFileServer) readStaticFile(filePath string) ([]byte, error) {
	b, err := ioutil.ReadFile(sfs.fullFilePath(filePath))
	return b, err
}

func execTpl(tpl *template.Template, ctx interface{}) ([]byte, error) {
	buf := bytes.NewBuffer(nil)

	err := tpl.Execute(buf, ctx)

	return buf.Bytes(), err
}
