TARGET := dist/fake_dom/mod.d.ts
SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types ./fwd/mod

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

build: prepare $(TARGET) req-build

prepare:
	npm i

$(TARGET):
	tsc ${EMIT_JS_DECLARATION} mod.js

req-build:
	make -C api
	make -C browse
	make -C event
	make -C implementation
	make -C std
	make -C types
