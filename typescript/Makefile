.PHONY: all clean
NODE_OPTIONS_ORIG=$(NODE_OPTIONS)
all: build/tests.js

run: build/tests.js
	NODE_OPTIONS="$(NODE_OPTIONS_ORIG)" node --es-module-specifier-resolution=node build/tests.js

build/tests.js: tests.ts */*.ts */*/*.ts
	NODE_OPTIONS= tsc --outDir build --sourceMap true --target esnext tests.ts

clean:
	rm -r build
