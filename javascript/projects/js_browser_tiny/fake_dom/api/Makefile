TARGET := dist/fake_dom/api/mod.d.ts
SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types ../fwd/mod

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: prepare $(TARGET) req-build

.ONESHELL:
prepare:
# patch npm
	npm i && return 0
	~/workspace/git/snippet_repo/javascript/js_browser_tiny/patches/apply_patch_a.sh
	npm i

$(TARGET):
	tsc ${EMIT_JS_DECLARATION} mod.js

req-build:
