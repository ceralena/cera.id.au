package cera

import (
	"io/ioutil"
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
	path := sfs.fullFilePath(req.Params["file_path"])

	http.ServeFile(req.W, req.R, path)
}

func (sfs staticFileServer) fullFilePath(filePath string) string {
	return filepath.Join(sfs.conf.StaticDir, filePath)
}

func (sfs staticFileServer) readStaticFile(filePath string) ([]byte, error) {
	b, err := ioutil.ReadFile(sfs.fullFilePath(filePath))
	return b, err
}
