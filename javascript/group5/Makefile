# conflicting names cause this to be required
# i want to name the file js_parse_regex.d.ts and
# add types to my javascript files
#
# This is the next best thing,
# use make to keep the copies up to date
.PHONY: all

all: js_parse_regex_1.js

js_parse_regex_1.ts.update:
	cp -u js_parse_regex_1.ts js_parse_regex.ts
	cp -u js_parse_regex.ts js_parse_regex_1.ts
js_parse_regex.ts.update:
	cp -u js_parse_regex_1.ts js_parse_regex.ts
	cp -u js_parse_regex.ts js_parse_regex_1.ts
.SILENT: js_parse_regex.ts.update js_parse_regex_1.ts.update

js_parse_regex.ts: js_parse_regex.ts.update
js_parse_regex_1.ts: js_parse_regex_1.ts.update

js_parse_regex_1.js: js_parse_regex_1.ts js_parse_regex.ts tsconfig.json
	tsc -p .

*.mtime:
	touch $@

clean:
	rm *.mtime