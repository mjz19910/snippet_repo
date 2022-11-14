.PHONY: all clean build/tests.js

NODE_OPTIONS += --experimental-specifier-resolution=node --experimental-loader ./loader/nice_loader.js

all: build/tests.js

run: build/tests.js
	node ${NODE_OPTIONS} build/tests.js

build/tests.js: src/tests.ts
	NODE_OPTIONS= tsc --outDir build --sourceMap true --target ESNext --module ESNext src/tests.ts

clean:
ifneq ($(wildcard build),)
	[ -d build ] && rm -r build
else
endif
