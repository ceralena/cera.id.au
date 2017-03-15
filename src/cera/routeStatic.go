package cera

import (
	"net/http"
	"path/filepath"

	"github.com/ceralena/go-restroute"
)

func getStaticRoute(conf Config) func(req restroute.Request) {
	return staticFileServer{conf}.getStaticFile
}

type staticFileServer struct {
	conf Config
}

func (sfs staticFileServer) getStaticFile(req restroute.Request) {
	path := filepath.Join(sfs.conf.StaticDir, req.Params["file_path"])

	http.ServeFile(req.W, req.R, path)
}
