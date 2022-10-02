MAKEFLAGS += --no-builtin-rules

TARGET := dist/browser_fake_dom/src/mod.d.ts
SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node

.PHONY: clean build all
.SUFFIXES:
all: build

clean:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: $(TARGET)

$(TARGET): src/**/*.js src/**/*.ts
	tsc ${EMIT_JS_DECLARATION} src/mod.js
