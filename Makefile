NODE=node
WEBPACK_CLI=./node_modules/webpack-cli/bin/cli.js

all: build

build:
	$(NODE) $(WEBPACK_CLI)

watch:
	WATCH=true $(NODE) $(WEBPACK_CLI)

.PHONY: all build watch
