SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --allowJs --emitDeclarationOnly --target esnext --outDir dist --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types ../dist/mod

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

req-build:

dist/mod.d.ts:
	tsc ${EMIT_JS_DECLARATION} mod.js
