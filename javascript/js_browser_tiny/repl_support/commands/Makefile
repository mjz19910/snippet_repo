SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --allowJs --emitDeclarationOnly --target esnext --outDir dist --moduleResolution node

.PHONY: clean build $(SRC_DECL_DIR)

clean: | $(SRC_DECL_DIR)

$(SRC_DECL_DIR):
	rm -r $(SRC_DECL_DIR)

build: prepare req-build dist/mod.d.ts

prepare:
	npm i

dist/mod.d.ts:
	tsc ${EMIT_JS_DECLARATION} mod.js
