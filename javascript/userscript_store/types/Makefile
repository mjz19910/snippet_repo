.PHONY: all
NODE_OPTIONS_ORIG=$(NODE_OPTIONS)
all: build/tests.ts
	
run: build/tests.ts
	NODE_OPTIONS="$(NODE_OPTIONS_ORIG)" node --es-module-specifier-resolution=node build/tests.js

build/tests.ts: tests.ts
	NODE_OPTIONS= tsc --outDir build --sourceMap true --target esnext tests.ts
