SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --allowJs --emitDeclarationOnly --target esnext --outDir dist --moduleResolution node

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: prepare req-build dist/mod.d.ts

prepare:
	npm i

dist/mod.d.ts: *.js
	tsc ${EMIT_JS_DECLARATION} mod.js
