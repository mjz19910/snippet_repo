SRC_DECL_DIR := $(wildcard dist)
EMIT_TYPESCRIPT_DECLARATION := -d --emitDeclarationOnly --target esnext --outDir dist --moduleResolution node

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: prepare dist/mod.d.ts

prepare:
	npm i

dist/mod.d.ts:
	tsc ${EMIT_TYPESCRIPT_DECLARATION} mod.ts
