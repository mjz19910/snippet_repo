PACKAGE_EXCLUDE := template/ ipc_api/ misc/
PACKAGES := $(filter-out $(PACKAGE_EXCLUDE),$(wildcard */))

all: $(PACKAGES:%/=%/jsconfig.json) $(PACKAGES)

help:
	@echo 'cd js_browser && . ./run.zsh'

.PHONY:all test $(PACKAGES)

$(PACKAGES:%/=%/jsconfig.json):
	cp -n template/jsconfig.json $@/jsconfig.json

$(PACKAGES):
	make -C $@

test:
	@echo $(PACKAGES:%/=%/jsconfig.json)

clean:
	for dir in $(PACKAGES); do \
		make -C $$dir clean;\
	done
