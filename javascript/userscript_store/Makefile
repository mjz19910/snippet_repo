all: typescript_errors.log

typescript_errors.log: rebuild_the_universe_auto_v0.2.js Makefile $(L1Reqs)
	npm exec -- tsc --allowJS rebuild_the_universe_auto_v0.2.js -t esnext --pretty --outDir build | tee $@


L1Reqs=types/vm/box/EmptyArrayBox.ts 