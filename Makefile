.PHONY: all clean

all:
	zsh -c ". ./userscript/youtube_plugin_raw/zd_gen_CF/gen_out.sh"

clean:
	make -C userscript clean
