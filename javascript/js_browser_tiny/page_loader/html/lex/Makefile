SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types $(shell realpath ../../../fake_dom/fwd/mod)

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl
	make -C box clean
	make -C plugin clean

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: prepare dist/html/lex/mod.d.ts req-build

prepare:
	npm i

# TODO: figure out the relative imports that are making this path long
#       and remove them
dist/html/lex/mod.d.ts:
	tsc ${EMIT_JS_DECLARATION} mod.js

req-build:
	make -C box
	make -C plugin