TARGET := dist/js_browser/mod.d.ts
SRC_DECL_DIR := $(wildcard dist)
EMIT_JS_DECLARATION := -d
EMIT_JS_DECLARATION += --allowJs
EMIT_JS_DECLARATION += --target esnext
EMIT_JS_DECLARATION += --outDir dist
EMIT_JS_DECLARATION += --moduleResolution node

.PHONY: clean build all

all: build

clean:
ifneq ($(SRC_DECL_DIR),)
	rm -r $(SRC_DECL_DIR)
endif

build: $(TARGET)

$(TARGET): *.js
	tsc ${EMIT_JS_DECLARATION} mod.js
