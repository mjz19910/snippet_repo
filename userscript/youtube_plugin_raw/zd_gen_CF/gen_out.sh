DEST_DIR="userscript/youtube_plugin_raw/zd_gen_CF/";
function setup {
	pushd $DEST_DIR;
	mv "out.ts" "out.ts.bak";
	cp "out_empty.ts" "out.ts";
	cp "gen_export_tmp.ts" "gen_export_cur.ts";
	mv tmp.bak.mts /tmp/tmp.bak.mts;
	cp out_empty.ts tmp.ts;
	popd;
}
function restore_on_failure {
	echo FAILED;
	sleep 12;
	mv "out.ts.bak" "out.ts";
}
function restore {
	cp "gen_export_out.ts" "gen_export_cur.ts";
	mv "out.ts.bak" /tmp/
}
function gen_find_type_is_not {
	grep -Po "(?<=of type ')\".+?\"(?=' is not).+ of type '(?!\")\w+'." "$@"
}
function generate_ts {
	# |{n: Prelude.CF_M_s; t: Types.CF_M_s_; v: "AD_AddToGuideSection";}
	perl -pe 's/"(.+?)".+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: "$1";}/gm'
}
setup;
tsc -p userscript > /tmp/errors.out;
pushd $DEST_DIR;
{
	cat "out_prelude.ts";
	echo "export namespace Gen {\n\texport type CF_Generated=";
	gen_find_type_is_not /tmp/errors.out | generate_ts | sort -u;
	echo "\t\t;";
	echo "}";
} > /tmp/tmp.ts;
mv /tmp/tmp.ts "tmp.ts";
tsc && cp "tmp.ts" "out.ts" || restore_on_failure;
restore;
cp "tmp.ts" "tmp.bak.mts";
cp "out_empty.ts" "tmp.ts";
popd;
unfunction restore;
