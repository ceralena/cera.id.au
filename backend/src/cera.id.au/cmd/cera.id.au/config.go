package main

import "github.com/ceralena/envconf"

type Config struct {
	HttpBind   string `default:"127.0.0.1:8080"`
	StaticDir  string `required:"true"`
	AppVersion string `required:"true"`
}

func (c Config) Validate() error {
	if err := validateHttpBind(c.HttpBind); err != nil {
		return err
	}
	return nil
}

func loadConfig() (Config, error) {
	var c Config

	// read and validate the config
	err := envconf.ReadConfigEnv(&c)
	if err != nil {
		return c, err
	}

	return c, c.Validate()
}
