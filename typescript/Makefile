.PHONY: all clean

all: build/src/tests.js

run: build/src/tests.js
	node build/src/tests.js

build/src/tests.js: src/tests.ts src/**/*.ts
	tsc --outDir build --sourceMap true --target ESNext --module ESNext src/tests.ts

clean:
ifneq ($(wildcard build),)
	[ -d build ] && rm -r build
else
endif
