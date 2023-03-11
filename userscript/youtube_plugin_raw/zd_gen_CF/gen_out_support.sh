export BACKUP_DATE=$(date '+%F_%H/%M')
export PROJ_DIR="$PWD"
export DEST_DIR="userscript/youtube_plugin_raw/zd_gen_CF"
export TMP_DIR="/dev/shm/snippet_repo_tmp"

function generate_ts-make_tmp_git_repo {
	if git -C "$TMP_DIR" rev-parse 2>/dev/null; then
		git -C "$TMP_DIR" reset --hard -q
		git -C "$TMP_DIR" pull -q
	else
		echo not in git repo at "$TMP_DIR"
		git clone "$PROJ_DIR" "$TMP_DIR" -q
	fi
	git -C "$PROJ_DIR" diff >"../snippet_repo.diff"
	git -C "$TMP_DIR" apply --allow-empty "../snippet_repo.diff"
	pushd "$TMP_DIR/userscript"
	pnpm i --silent
	popd
}

function generate_ts-init_cwd {
	cp "out_empty.ts" "generated/out.ts" || exit 1
	cp "gen_export_tmp.ts" "gen_export_cur.ts" || exit 1
	mv "generated/tmp.ts" "generated/tmp.ts.bak" || exit 1
	cp "out_empty.ts" "generated/tmp.ts" || exit 1
}

function generate_ts-backup_output_at_project {
	cp -ru "$DEST_DIR/generated" "$TMP_DIR/$DEST_DIR"
	{
		pushd "$DEST_DIR"
		mkdir -p "$PROJ_DIR/$DEST_DIR/bak/$BACKUP_DATE"
		cp "generated/out.ts" "$PROJ_DIR/$DEST_DIR/bak/"${BACKUP_DATE}"/out.ts.bak" || exit 1
		cp "$TMP_DIR/$DEST_DIR/generated/out.ts" "$TMP_DIR/$DEST_DIR/generated/out.ts.bak" || exit 1
		popd
	}
}

function generate_ts-backup_output_at_tmp() {
	mkdir -p "$PROJ_DIR/$DEST_DIR/bak/$BACKUP_DATE"
	mv "generated/tmp.ts" "$PROJ_DIR/$DEST_DIR/bak/$BACKUP_DATE/tmp.ts.bak" || exit 1
	mv "$TMP_DIR/errors.out" "$PROJ_DIR/$DEST_DIR/bak/$BACKUP_DATE/errors.out"
}

function generate_ts-restore {
	cp "gen_export_out.ts" "gen_export_cur.ts" || exit 1
	cp "out_empty.ts" "generated/tmp.ts" || exit 1
	mv "$TMP_DIR/tmp.ts" "generated/tmp.ts" || exit 1
	mv "generated/tmp.ts" "generated/out.ts" || exit 1
	cp "out_empty.ts" "generated/tmp.ts" || exit 1
}

function generate_ts-filter_errors {
	grep -Po "$(cat grep.args)" "$@"
}

function generate_ts-with_perl {
	# |{n: Prelude.CF_M_s; t: Types.CF_M_s_; v: "AD_AddToGuideSection";}
	perl gen.pm
}

function gen_code_v1 {
	for ((i = 0; ; ++i)); do
		generate_ts-filter_errors "$TMP_DIR/errors.out" | generate_ts-with_perl | sort -u >"$TMP_DIR/tmp_out.txt"
		echo "--- [tmp_out.txt] $i ---"
		tail "$TMP_DIR/tmp_out.txt"
		if grep -q "n:" "$TMP_DIR/tmp_out.txt"; then
			generate_typescript_code_unique
			cp "$TMP_DIR/tmp.ts" "generated/tmp.ts"
			tsc -p "$TMP_DIR/userscript" >"$TMP_DIR/errors.out"
			grep "|{n:" "$TMP_DIR/tmp.ts" | sort -u >"$TMP_DIR/tmp_partial.ts"
		else
			generate_typescript_code_unique
			cp "$TMP_DIR/tmp.ts" "generated/tmp.ts"
			cp "$TMP_DIR/tmp.ts" "generated/out.ts"
			grep "|{n:" "$TMP_DIR/tmp.ts" | sort -u >"$TMP_DIR/tmp_partial_end.ts"
			break
		fi
	done
}

generate_typescript_code_unique() {
	echo "export namespace Gen {\n\texport type CF_Generated=" >"$TMP_DIR/tmp.ts"
	cat "$TMP_DIR/tmp_partial.ts" "$TMP_DIR/tmp_out.txt" | sort -u >>"$TMP_DIR/tmp.ts"
	echo "\t\t;" >>"$TMP_DIR/tmp.ts"
	echo "}" >>"$TMP_DIR/tmp.ts"
}

generate_typescript_code_unique_final() {
	echo "export namespace Gen {\n\texport type CF_Generated="
	cat "$TMP_DIR/tmp_partial.ts" "$TMP_DIR/tmp_out.txt" | sort -u
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

function generate_ts-output_v1 {
	generate_ts-make_tmp_git_repo
	generate_ts-backup_output_at_project
	{
		pushd "$TMP_DIR/$DEST_DIR"
		generate_ts-init_cwd

		cp "$PROJ_DIR/$DEST_DIR/generated/out.ts" "generated/tmp.ts"

		grep "|{n:" "generated/out.ts.bak" >"$TMP_DIR/tmp_partial.ts"
		generate_typescript_code_force_valid >"$TMP_DIR/tmp.ts"
		tsc -p "$TMP_DIR/userscript" >"$TMP_DIR/errors.out"
		gen_code_v1
		generate_ts-backup_output_at_tmp
		generate_ts-restore
		popd
	}
	generate_typescript_code_unique_final >$DEST_DIR/generated/out.ts
}
