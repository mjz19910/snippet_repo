SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types ../dist/mod
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types node

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl
	make -C commands clean
	make -C detail clean
	make -C plugins clean
	make -C types clean

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: prepare dist/mod.d.ts req-build

prepare:
	npm i

dist/mod.d.ts: *.js package.json Makefile
	tsc ${EMIT_JS_DECLARATION} mod.js

req-build:
	make -C commands
	make -C detail
	make -C plugins
	make -C types

