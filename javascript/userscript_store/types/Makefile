NODE_OPTIONS_ORIG=$NODE_OPTIONS
all: tests.ts
	NODE_OPTIONS= tsc --outDir build --sourceMap true tests.ts
run: all
	NODE_OPTIONS=$(NODE_OPTIONS) node build/tests
