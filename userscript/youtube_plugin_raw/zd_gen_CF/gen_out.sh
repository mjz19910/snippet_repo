function setup {
	mv "$DEST_DIR/out.ts" "$DEST_DIR/out.ts.bak";
	cp "$DEST_DIR/out_empty.ts" "$DEST_DIR/out.ts";
	cp "$DEST_DIR/gen_export_out.ts" "$DEST_DIR/gen_export_out.ts.bak";
	cp "$DEST_DIR/gen_export_tmp.ts.txt" "$DEST_DIR/gen_export_out.ts";
}
function restore_on_failure {
	mv "$DEST_DIR/out.ts.bak" "$DEST_DIR/out.ts";
}
function restore {
	mv "$DEST_DIR/gen_export_out.ts.bak" "$DEST_DIR/gen_export_out.ts";
}
function gen_find_type_is_not {
	grep -Po "(?<=of type ')\".+?\"(?=' is not).+"
}
function generate_ts {
	# |{n: Prelude.CF_M_s; t: Types.CF_M_s_; v: "AD_AddToGuideSection";}
	perl -pe 's/"(.+?)".+type .(.+).\./\t\t|{n: Prelude.$2; t: Types.$2_; v: "$1";}/gm'
}
DEST_DIR="userscript/youtube_plugin_raw/zd_gen_CF/";
setup;
{
	cat "$DEST_DIR/out_prelude.ts";
	echo "export namespace Gen {\n\texport type CF_Generated=";
	tsc -p userscript | gen_find_type_is_not | generate_ts | sort -u;
	echo "}";
} > /tmp/tmp.ts;
mv /tmp/tmp.ts "$DEST_DIR/tmp.ts";
tsc -p userscript&&cp "$DEST_DIR/tmp.ts" "$DEST_DIR/out.ts" || restore_on_failure;
restore;
cp "$DEST_DIR/tmp.ts" "$DEST_DIR/tmp.bak.mts";
rm "$DEST_DIR/tmp.ts";

unfunction restore;
