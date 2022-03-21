TARGET := dist/mod.d.ts
SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION += --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types ../dist/mod
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types node

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: prepare $(TARGET) req-build

prepare:
	npm i

req-build:

$(TARGET): *.js package.json Makefile
	tsc ${EMIT_JS_DECLARATION} mod.js
