SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly --target esnext --outDir dist --moduleResolution node
EMIT_JS_DECLARATION += --types ../dist/mod
EMIT_JS_DECLARATION += --types node

.PHONY: clean clean-src-decl build all

all: build

clean:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: dist/mod.d.ts

dist/mod.d.ts: *.ts Makefile
	tsc ${EMIT_JS_DECLARATION} mod.ts
