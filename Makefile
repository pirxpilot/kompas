PROJECT = kompas
SRC = index.js $(wildcard lib/*.js)

all: check compile

check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	node --test \
		--require jsdom-global/register \
		--require should

build/index.js: $(SRC)
	./node_modules/.bin/esbuild \
			--bundle \
			--sourcemap \
			--global-name=$(PROJECT) \
			--outfile=$@ \
			index.js

clean:
	rm -rf build

compile: build/index.js

.PHONY: check lint test
