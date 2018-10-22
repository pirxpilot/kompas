PROJECT = kompas
SRC = index.js $(wildcard lib/*.js)

all: check compile

check: lint test

lint:
	./node_modules/.bin/jshint *.js lib test

test:
	./node_modules/.bin/mocha --recursive \
		--require jsdom-global/register \
		--require should

build/index.js: $(SRC)
	./node_modules/.bin/browserify \
		--debug \
		--require ./index.js:$(PROJECT) \
		--outfile $@

clean:
	rm -rf build

compile: build/index.js

.PHONY: check lint test
