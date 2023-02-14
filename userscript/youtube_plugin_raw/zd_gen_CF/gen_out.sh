export BACKUP_DATE=$(date '+%F_%H/%M')
export PROJ_DIR="$PWD"
export DEST_DIR="userscript/youtube_plugin_raw/zd_gen_CF"
export TMP_DIR="/dev/shm/snippet_repo_tmp"
. "$PROJ_DIR/$DEST_DIR/gen_out_support.sh"
function gen_code {
	cat "out_prelude.ts" >"$TMP_DIR/tmp.ts"
	echo "export namespace Gen {\n\texport type CF_Generated=" >>"$TMP_DIR/tmp.ts"
	cat "$TMP_DIR/tmp_partial.ts" >>"$TMP_DIR/tmp.ts"
	for ((i = 0; ; ++i)); do
		generate_ts_filter_errors "$TMP_DIR/errors.out" | generate_ts_with_perl | sort -u >tmp_out.txt
		echo "--- [tmp_out.txt] $i ---"
		tail tmp_out.txt
		if grep -q "n:" tmp_out.txt; then
			cat tmp_out.txt >>"$TMP_DIR/tmp.ts"
			cp "$TMP_DIR/tmp.ts" "$TMP_DIR/tmp_acc.ts"
			echo "\t\t;" >>"$TMP_DIR/tmp.ts"
			echo "}" >>"$TMP_DIR/tmp.ts"
			cp "$TMP_DIR/tmp.ts" tmp.ts
			tsc -p "$TMP_DIR/userscript" >"$TMP_DIR/errors.out"
			mv "$TMP_DIR/tmp_acc.ts" "$TMP_DIR/tmp.ts"
		else
			cat tmp_out.txt >>"$TMP_DIR/tmp.ts"
			cp "$TMP_DIR/tmp.ts" "$TMP_DIR/tmp_acc.ts"
			echo "\t\t;" >>"$TMP_DIR/tmp.ts"
			echo "}" >>"$TMP_DIR/tmp.ts"
			break
		fi
	done

}
function generate_ts_output {
	generate_ts_setup
	grep "|{n:" "out.ts.bak" >"$TMP_DIR/tmp_partial.ts"
	cat "out_prelude.ts" >"$TMP_DIR/tmp.ts"
	echo "export namespace Gen {\n\texport type CF_Generated=" >>"$TMP_DIR/tmp.ts"
	echo "\n\t\t|never" >>"$TMP_DIR/tmp.ts"
	cat "$TMP_DIR/tmp_partial.ts" >>"$TMP_DIR/tmp.ts"
	echo "\t\t;" >>"$TMP_DIR/tmp.ts"
	echo "}" >>"$TMP_DIR/tmp.ts"
	cp "$TMP_DIR/tmp.ts" tmp.ts
	tsc -p "$TMP_DIR/userscript" >"$TMP_DIR/errors.out"
	gen_code
	generate_ts_restore
}
generate_ts_output
