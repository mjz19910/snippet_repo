TARGET := dist/mod.d.ts
OUTPUT_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d --emitDeclarationOnly
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --allowJs
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --target esnext
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --outDir dist
EMIT_JS_DECLARATION := $(EMIT_JS_DECLARATION) --moduleResolution node

.PHONY: clean build all

all: build

clean:
ifneq ($(OUTPUT_DIR),)
	rm -r $(OUTPUT_DIR)
endif

build: $(TARGET)

$(TARGET): *.js
	tsc ${EMIT_JS_DECLARATION} mod.js
