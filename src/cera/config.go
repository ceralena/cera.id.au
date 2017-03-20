package cera

import "github.com/ceralena/envconf"

// Config is the config for the server.
type Config struct {
	Port      int    `default:"8080"`
	StaticDir string `default:"static"`
	DevMode   bool   `default:"false"`
}

// LoadConfigFromEnv loads a Config instance from the process environment.
func LoadConfigFromEnv() (Config, error) {
	conf := Config{}
	err := envconf.ReadConfigEnv(&conf)

	return conf, err
}
