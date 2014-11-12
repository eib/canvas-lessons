all: build

build:
	browserify src/demos/static/main.js --outfile src/demos/static/bundle.js --debug

watch:
	watchify src/demos/static/main.js --outfile src/demos/static/bundle.js --debug

.PHONY: all build watch
