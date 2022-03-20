SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl
	make -C fake_dom clean
	make -C page_loader clean
	make -C preload clean
	make -C repl_support clean

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: prepare dist/mod.d.ts req-build

prepare:
	npm i

dist/mod.d.ts: *.js
	tsc ${EMIT_JS_DECLARATION} mod.js

req-build:
	make -C fake_dom
	make -C page_loader
	make -C preload
	make -C repl_support
