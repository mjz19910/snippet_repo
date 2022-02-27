all: typescript_errors.log

typescript_errors.log: rebuild_the_universe_auto_v0.2.js Makefile $(BoxReqs) $(VMReqs)
	npm exec -- tsc --allowJS rebuild_the_universe_auto_v0.2.js -t esnext --pretty --outDir build | tee $@


BoxReqs=$(wildcard types/vm/box/*.ts)
VMReqs=$(wildcard types/vm/*.ts)
