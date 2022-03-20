SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --allowJs --emitDeclarationOnly --target esnext --outDir dist --moduleResolution node

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

build: prepare req-build dist/mod.d.ts

prepare:
	npm i

dist/mod.d.ts:
	tsc ${EMIT_JS_DECLARATION} mod.js

req-build:
	make -C fake_dom
	make -C page_loader
	make -C preload
	make -C repl_support
