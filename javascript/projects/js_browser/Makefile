TARGET := dist/js_browser/mod.d.ts
SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node

.PHONY: clean build all

all: build

clean:
	make -C ../browser_fake_dom clean
	make -C ../page_loader clean
	make -C ../preload clean
	make -C ../repl_support clean
	make -C ../tiny_html_parser clean
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: $(TARGET) req-build

$(TARGET): *.js
	tsc ${EMIT_JS_DECLARATION} mod.js

req-build:
	make -C ../browser_fake_dom
	make -C ../page_loader
	make -C ../tiny_html_parser
