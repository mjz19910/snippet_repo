PACKAGES := $(filter-out template/,$(wildcard */))

all: $(PACKAGES)

.PHONY:all test $(PACKAGES)

$(PACKAGES):
	cp -n template/jsconfig.json $(patsubst %/,%,$(@))/jsconfig.json

test:
	@echo $(PACKAGES:%/=%)
