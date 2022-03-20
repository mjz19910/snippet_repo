SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --allowJs --emitDeclarationOnly --target esnext --outDir dist --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types ../dist/mod
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types node

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl
	make -C api clean
	make -C browse clean
	make -C event clean
	make -C implementation clean
	make -C std clean
	make -C types clean

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: prepare dist/mod.d.ts req-build

prepare:
	npm i

dist/mod.d.ts:
	tsc ${EMIT_JS_DECLARATION} mod.js

req-build:
	make -C api
	make -C browse
	make -C event
	make -C implementation
	make -C std
	make -C types
