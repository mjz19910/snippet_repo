.PHONY: all build copy_to_window

all: build

build:
	mkdir build/userscripts
	perl export.pl src/rebuild_the_universe.ts > build/userscripts/rebuild_the_universe_auto.user.ts

copy_to_window:
	perl export.pl src/rebuild_the_universe.ts | win32yank.exe -i

clean:
	rm -r build
