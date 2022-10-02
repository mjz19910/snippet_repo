TARGET := dist/fake_dom/mod.d.ts
SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types ./src/fwd/mod

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl
	make -C src/api clean
	make -C src/browse clean
	make -C src/event clean
	make -C src/implementation clean
	make -C src/std clean
	make -C src/types clean

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: prepare $(TARGET) req-build

prepare:
	npm i

$(TARGET):
	tsc ${EMIT_JS_DECLARATION} src/mod.js

req-build:
	make -C src/api
	make -C src/browse
	make -C src/event
	make -C src/implementation
	make -C src/std
	make -C src/types
