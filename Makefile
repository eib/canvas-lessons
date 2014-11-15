all: build

build:
	#./bin/bundle.sh
	browserify src/demos/snowflake/main.js -t brfs --outfile src/demos/snowflake/bundle.js

watch:
	#WATCH=1 ./bin/bundle.sh
	watchify src/demos/snowflake/main.js -t brfs --outfile src/demos/snowflake/bundle.js

.PHONY: all build watch
