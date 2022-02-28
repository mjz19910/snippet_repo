.PHONY: all

all: $(patsubst %.js,%.ts, $(wildcard *.js))

%.ts: %.js
	mv $^ $@
