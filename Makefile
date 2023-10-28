.PHONY: all youtube_plugin_generate_ts clean

all: 

youtube_plugin_generate_ts:
	zsh -c ". ./userscript/youtube_plugin_raw/zd_gen_CF/gen_out_support.sh ;generate_ts-output_v1"

clean:
	make -C userscript clean
	make -C cmd_js clean
	make -C nmap clean
	make -C browser_js clean
	printf "cleaned \"%s\"\n" $$PWD
