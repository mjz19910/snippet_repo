DEST_DIR="userscript/youtube_plugin_raw/zd_gen_CF/";
BACKUP_DATE=$(date '+%F_%H/%M');
function setup {
	pushd $DEST_DIR;
	mkdir -p "bak/$BACKUP_DATE";
	mv "out.ts" "bak/"${BACKUP_DATE}"/out.ts.bak";
	cp "out_empty.ts" "out.ts";
	cp "gen_export_tmp.ts" "gen_export_cur.ts";
	cp "out_empty.ts" "tmp.ts";
	popd;
}
function on_failure {
	echo FAILED;
}
function restore {
	cp "gen_export_out.ts" "gen_export_cur.ts";
}
function gen_find_type_is_not {
	grep -Po "(?<=of type )'\".+?\"'(?= is not).+ of type '(?!\")\w+'." "$@"
}
function generate_ts {
	# |{n: Prelude.CF_M_s; t: Types.CF_M_s_; v: "AD_AddToGuideSection";}
	perl -p gen.pm
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
tsc || on_failure;
cp "tmp.ts" "out.ts";
restore;
mv "tmp.ts" "bak/"${BACKUP_DATE}"/tmp.ts.bak";
cp "out_empty.ts" "tmp.ts";
popd;
unfunction restore;
