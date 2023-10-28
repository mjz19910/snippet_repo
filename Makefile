.PHONY: all youtube_plugin_generate_ts clean typescript_build

all:

typescript_build:
	make -C userscript typescript_build
	make -C cmd_js typescript_build
	make -C nmap typescript_build
	make -C browser_js typescript_build

youtube_plugin_generate_ts:
	zsh -c ". ./userscript/youtube_plugin_raw/zd_gen_CF/gen_out_support.sh ;generate_ts-output_v1"

clean:
	make -C userscript clean
	make -C cmd_js clean
	make -C nmap clean
	make -C browser_js clean
	printf "cleaned \"%s\"\n" $$PWD
