all: build

build:
	#./bin/bundle.sh
	browserify src/demos/graph/main.js -t brfs --outfile src/demos/graph/bundle.js

watch:
	#WATCH=1 ./bin/bundle.sh
	watchify src/demos/graph/main.js -t brfs --outfile src/demos/graph/bundle.js

.PHONY: all build watch
