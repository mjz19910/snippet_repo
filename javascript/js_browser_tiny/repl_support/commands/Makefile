SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types ../dist/mod

.PHONY: clean build $(SRC_DECL_DIR)

clean: | $(SRC_DECL_DIR)

$(SRC_DECL_DIR):
	rm -r $(SRC_DECL_DIR)

build: prepare req-build dist/mod.d.ts

prepare:
	npm i

dist/mod.d.ts:
	tsc ${EMIT_JS_DECLARATION} mod.js
