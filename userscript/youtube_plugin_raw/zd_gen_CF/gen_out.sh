export BACKUP_DATE=$(date '+%F_%H/%M')
export PROJ_DIR="$PWD"
export DEST_DIR="userscript/youtube_plugin_raw/zd_gen_CF"
export TMP_DIR="/dev/shm/snippet_repo_tmp"
. "$PROJ_DIR/$DEST_DIR/gen_out_support.sh"
function gen_code {
	for ((i = 0; ; ++i)); do
		generate_ts_filter_errors "$TMP_DIR/errors.out" | generate_ts_with_perl | sort -u >"$TMP_DIR/tmp_out.txt"
		echo "--- [tmp_out.txt] $i ---"
		tail "$TMP_DIR/tmp_out.txt"
		if grep -q "n:" "$TMP_DIR/tmp_out.txt"; then
			echo "export namespace Gen {\n\texport type CF_Generated=" >"$TMP_DIR/tmp.ts"
			cat "$TMP_DIR/tmp_partial.ts" "$TMP_DIR/tmp_out.txt" >"$TMP_DIR/tmp_2.ts"
			sort -u <"$TMP_DIR/tmp_2.ts" >>"$TMP_DIR/tmp.ts"
			cp "$TMP_DIR/tmp.ts" "$TMP_DIR/tmp_acc.ts"
			echo "\t\t;" >>"$TMP_DIR/tmp.ts"
			echo "}" >>"$TMP_DIR/tmp.ts"
			cp "$TMP_DIR/tmp.ts" tmp.ts
			tsc -p "$TMP_DIR/userscript" >"$TMP_DIR/errors.out"
			mv "$TMP_DIR/tmp_acc.ts" "$TMP_DIR/tmp.ts"
			grep "|{n:" "$TMP_DIR/tmp.ts" | sort -u >"$TMP_DIR/tmp_partial.ts"
		else
			generate_typescript_code_unique >"$TMP_DIR/tmp.ts"
			grep "|{n:" "$TMP_DIR/tmp.ts" | sort -u >"$TMP_DIR/tmp_partial_end.ts"
			break
		fi
	done
}
generate_typescript_code_unique() {
	echo "export namespace Gen {\n\texport type CF_Generated="
	cat "$TMP_DIR/tmp_partial.ts" "$TMP_DIR/tmp_out.txt" | sort -u
	src_file=$(realpath "/proc/self/fd/0")
	if [ -f $src_file ]; then
		# if stdin is a normal file, save the partial result
		cp "$src_file" "$TMP_DIR/tmp_acc.ts"
	fi
	echo "\t\t;"
	echo "}"
}
generate_typescript_code_force_valid() {
	echo "export namespace Gen {\n\texport type CF_Generated="
	echo "\n\t\t|never"
	cat "$TMP_DIR/tmp_partial.ts"
	echo "\t\t;"
	echo "}"
}
function generate_ts_output {
	generate_ts_setup
	grep "|{n:" "out.ts.bak" >"$TMP_DIR/tmp_partial.ts"
	generate_typescript_code_force_valid >"$TMP_DIR/tmp.ts"
	cp "$TMP_DIR/tmp.ts" "tmp.ts"
	tsc -p "$TMP_DIR/userscript" >"$TMP_DIR/errors.out"
	gen_code
	generate_ts_restore
}

generate_ts_output
