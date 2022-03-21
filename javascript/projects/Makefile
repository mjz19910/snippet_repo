PACKAGES := $(wildcard */)

all: $(PACKAGES)

.PHONY:all test $(PACKAGES)

$(PACKAGES):
	cp -n template/jsconfig_template.json $(patsubst %/,%,$(@))/jsconfig.json

test:
	@echo $(PACKAGES:%/=%)
