all: build

build:
	./bin/bundle.sh

watch:
	WATCH=1 ./bin/bundle.sh

.PHONY: all build watch
