package cera

import (
	"net/http"
	"strconv"

	"cera/log"
)

// Server is the interface for the server.
type Server interface {
	Run() error
}

// NewServer creates a new server. It will not run until Run() is called.
func NewServer(conf Config) (Server, error) {
	handler, err := getRoutes(conf)
	if err != nil {
		return nil, err
	}
	return &httpServer{handler, conf}, nil
}

type httpServer struct {
	http.Handler
	Config
}

// Run runs the server.
func (s *httpServer) Run() error {
	log.F("cera.id.au server listening on :%d", s.Config.Port)
	return http.ListenAndServe(formatPortForListen(s.Config.Port), s.Handler)
}

func formatPortForListen(port int) string {
	return ":" + strconv.Itoa(port)
}
