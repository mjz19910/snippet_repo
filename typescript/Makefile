.PHONY: all clean

all: build/tests.js

run: build/tests.js
	node build/tests.js

build/tests.js: src/tests.ts src/**/*.ts
	NODE_OPTIONS= tsc --outDir build --sourceMap true --target ESNext --module ESNext src/tests.ts

clean:
ifneq ($(wildcard build),)
	[ -d build ] && rm -r build
else
endif
