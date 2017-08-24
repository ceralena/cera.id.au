lint-all: lint-server

lint-server:
	gofmt -w backend/src

build-dev-all: lint-all
	make -j build-dev-server build-dev-frontend

build-dev-server:
	cd backend && gb build ...

build-prod-server: build-dev-server

build-dev-frontend:
	cd frontend && yarn && ./node_modules/.bin/webpack

build-prod-frontend:
	cd frontend && yarn && NODE_ENV=production ./node_modules/.bin/webpack

run-dev-server: build-dev-all
	STATICDIR=frontend/static APPVERSION=dev ./backend/bin/cera.id.au
