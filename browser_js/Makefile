.PHONY: all clean

all:

.PHONY: typescript_build
typescript_build:
	tsc

clean:
	printf "clean \"%s\"\n" $$PWD
	[ -f ./dist ] && rm ./dist || true
	[ -f ./node_modules ] && rm ./node_modules || true
	make -C loader clean
