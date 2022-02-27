all: rebuild_the_universe_auto_v0.2.js typescript_errors.log

typescript_errors.log:
	npm exec -- tsc --allowJS rebuild_the_universe_auto_v0.2.js --outDir build | tee $@
