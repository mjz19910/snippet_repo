TARGET := dist/lex/mod.d.ts
DOM_FWD := ../../fake_dom/fwd/mod
SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --types $(DOM_FWD)

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl
	make -C box clean
	make -C plugin clean

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: $(DOM_FWD).d.ts prepare $(TARGET) req-build

prepare:
	npm i

# TODO: figure out the relative imports that are making this path long
#       and remove them
$(TARGET):
	tsc ${EMIT_JS_DECLARATION} mod.js

req-build:
	make -C box
	make -C plugin