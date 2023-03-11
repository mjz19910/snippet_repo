.PHONY: all clean

all:
	zsh -c ". ./userscript/youtube_plugin_raw/zd_gen_CF/gen_out_support.sh ;generate_ts-output_v1"

clean:
	make -C userscript clean
