PROJECT = kompas
SRC = index.js $(wildcard lib/*.js)

all: check compile

check: lint test

lint:
	./node_modules/.bin/biome ci

format:
	./node_modules/.bin/biome check --fix

test:
	node --test \
		--require jsdom-global/register \
		$(TEST_OPTS)

test-cov: TEST_OPTS := --experimental-test-coverage
test-cov: test

.PHONY: check format lint test test-cov

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

.PHONY: clean compile
