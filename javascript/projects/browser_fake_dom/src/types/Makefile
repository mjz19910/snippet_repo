TARGET := dist/mod.d.ts
SRC_DECL_DIR := $(wildcard dist)
EMIT_TYPESCRIPT_DECLARATION := -d --emitDeclarationOnly
EMIT_TYPESCRIPT_DECLARATION := $(EMIT_TYPESCRIPT_DECLARATION) --target esnext
EMIT_TYPESCRIPT_DECLARATION := $(EMIT_TYPESCRIPT_DECLARATION) --outDir dist
EMIT_TYPESCRIPT_DECLARATION := $(EMIT_TYPESCRIPT_DECLARATION) --moduleResolution node
EMIT_TYPESCRIPT_DECLARATION := $(EMIT_TYPESCRIPT_DECLARATION) --types ../dist/mod
EMIT_TYPESCRIPT_DECLARATION := $(EMIT_TYPESCRIPT_DECLARATION) --types ../../../dist/mod

.PHONY: clean clean-src-decl build all

all: build

clean: clean-src-decl

clean-src-decl:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: $(TARGET)

$(TARGET): *.js
	tsc ${EMIT_JS_DECLARATION} mod.js
