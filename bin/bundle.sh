#!/bin/bash

NODE_MODULES="$PWD/node_modules"
BROWSERIFY=$NODE_MODULES/.bin/browserify
WATCHIFY=$NODE_MODULES/.bin/watchify


MAIN_FILES=`find . -name "main.js" | grep -v "node_modules"`

echo
for IN_FILE in $MAIN_FILES; do
    DIR=`dirname $IN_FILE`
    OUT_FILE="$DIR/bundle.js"
	if [ -z "$WATCH" ]; then
		echo "Browserifying $IN_FILE => $OUT_FILE"
		$BROWSERIFY $IN_FILE --outfile $OUT_FILE --debug
	else
		echo "Watchifying $IN_FILE => $OUT_FILE"
		$WATCHIFY $IN_FILE --outfile $OUT_FILE --debug &
	fi
done

echo "Done."
echo
