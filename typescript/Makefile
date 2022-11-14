.PHONY: all clean build/tests.js

.ONESHELL: build/tests.js

NODE_OPTIONS += --experimental-specifier-resolution=node --experimental-loader ./loader/nice_loader.js

all: build/tests.js

run: build/tests.js
	node build/tests.js

define no-node-opt
	@NODE_OPTIONS=
	export NODE_OPTIONS
endef

build/tests.js: src/tests.ts
	$(no-node-opt)
	xargs </dev/null -t tsc --outDir build --sourceMap true --target ESNext --module ESNext src/tests.ts

clean:
ifneq ($(wildcard build),)
	[ -d build ] && rm -r build
else
endif
