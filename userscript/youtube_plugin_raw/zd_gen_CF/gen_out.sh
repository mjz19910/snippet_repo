BACKUP_DATE=$(date '+%F_%H/%M')
PROJ_DIR="$PWD"
DEST_DIR="userscript/youtube_plugin_raw/zd_gen_CF"
TMP_DIR="/dev/shm/snippet_repo_tmp"
. "$PROJ_DIR/$DEST_DIR/gen_out_support.sh"
function gen_code {
	cat "out_prelude.ts"
	echo "export namespace Gen {\n\texport type CF_Generated="
	for ((;;)); do
		tail "$TMP_DIR/errors.out"
		generate_ts_filter_errors "$TMP_DIR/errors.out" | generate_ts_with_perl | sort -u >tmp_out.txt
		tail tmp_out.txt
		if grep -q "n:" tmp_out.txt; then; else
			break;
		fi
	done
	echo "\t\t;"
	echo "}"

}
function generate_ts_output {
	generate_ts_setup
	tsc -p "$TMP_DIR/userscript" >"$TMP_DIR/errors.out"
	gen_code >"$TMP_DIR/tmp.ts"
	generate_ts_restore
}
generate_ts_output
