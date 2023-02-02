BACKUP_DATE=$(date '+%F_%H/%M')
PROJ_DIR="$PWD"
DEST_DIR="userscript/youtube_plugin_raw/zd_gen_CF"
TMP_DIR="/dev/shm/snippet_repo_tmp"
function make_tmp_git_repo {
	pushd /dev/shm
	if git -C "$TMP_DIR" rev-parse 2>/dev/null; then
		pushd "$TMP_DIR"
		git reset --hard -q
		git pull -q
		popd
	else
		echo not in git repo at $TMP_DIR
		git clone "$PROJ_DIR" snippet_repo_tmp -q
	fi
	popd
}
function make_backup_of_generated_output {
	pushd "$DEST_DIR"
	mkdir -p "bak/$BACKUP_DATE"
	cp "out.ts" "bak/"${BACKUP_DATE}"/out.ts.bak"
	popd
}
function init_cwd_for_codegen_from_errors {
	cp "out_empty.ts" "out.ts"
	cp "gen_export_tmp.ts" "gen_export_cur.ts"
	cp "out_empty.ts" "tmp.ts"

}
function setup {
	make_tmp_git_repo
	make_backup_of_generated_output
	pushd "$TMP_DIR/$DEST_DIR"
	init_cwd_for_codegen_from_errors
}
function restore {
	cp "gen_export_out.ts" "gen_export_cur.ts"
	mv "tmp.ts" "$PROJ_DIR/$DEST_DIR/bak/"${BACKUP_DATE}"/tmp.ts.bak"
	cp "out_empty.ts" "tmp.ts"
	mv "$TMP_DIR/tmp.ts" "tmp.ts"
	cp "tmp.ts" "out.ts"
	popd
	cp "$TMP_DIR/$DEST_DIR/out.ts" "$DEST_DIR/out.ts"
}
function gen_find_type_is_not {
	grep -Po "(?<=of type )'\".+?\"'(?= is not).+ of type '(?!\")\w+'." "$@"
}
function generate_ts {
	# |{n: Prelude.CF_M_s; t: Types.CF_M_s_; v: "AD_AddToGuideSection";}
	perl -p gen.pm
}
setup
tsc -p "$TMP_DIR/userscript" >"$TMP_DIR/errors.out"
{
	cat "out_prelude.ts"
	echo "export namespace Gen {\n\texport type CF_Generated="
	gen_find_type_is_not "$TMP_DIR/errors.out" | generate_ts | sort -u
	echo "\t\t;"
	echo "}"
} >"$TMP_DIR/tmp.ts"
restore
unfunction restore
