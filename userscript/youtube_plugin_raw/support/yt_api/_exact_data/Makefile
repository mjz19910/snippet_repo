.PHONY: all
FILES_IN=$(wildcard *.json)
FILES_OUT=$(patsubst %.json,%.json.d.ts,$(FILES_IN))
all: $(FILES_OUT)

$(FILES_OUT):
	npx ts-json-as-const $(FILES_IN)
