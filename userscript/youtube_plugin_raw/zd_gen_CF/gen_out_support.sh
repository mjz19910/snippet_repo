function generate_ts_after_tmp_git_repo {
	git apply --allow-empty "../snippet_repo.diff"
}
function generate_ts_make_tmp_git_repo {
	pushd /dev/shm
	git -C $PROJ_DIR diff >"snippet_repo.diff"
	if git -C "$TMP_DIR" rev-parse 2>/dev/null; then
		pushd "$TMP_DIR"
		git reset --hard -q
		git pull -q
		generate_ts_after_tmp_git_repo
		popd
	else
		echo not in git repo at $TMP_DIR
		git clone "$PROJ_DIR" snippet_repo_tmp -q
		pushd "$TMP_DIR"
		generate_ts_after_tmp_git_repo
		pushd "$TMP_DIR/$DEST_DIR"
		pnpm i --silent
		popd
		popd
	fi
	popd
}
function generate_ts_init_cwd {
	cp "out_empty.ts" "out.ts"
	cp "gen_export_tmp.ts" "gen_export_cur.ts"
	mv "tmp.ts" "tmp.ts.bak"
	cp "out_empty.ts" "tmp.ts"
}
function generate_ts_backup_output {
	pushd "$DEST_DIR"
	mkdir -p "bak/$BACKUP_DATE"
	cp "out.ts" "bak/"${BACKUP_DATE}"/out.ts.bak"
	pushd "$TMP_DIR/$DEST_DIR"
	cp "out.ts" "out.ts.bak"
	popd
	popd
}
function generate_ts_setup {
	generate_ts_make_tmp_git_repo
	generate_ts_backup_output
	pushd "$TMP_DIR/$DEST_DIR"
	generate_ts_init_cwd
}
function generate_ts_restore {
	mv "tmp.ts" "$PROJ_DIR/$DEST_DIR/bak/"${BACKUP_DATE}"/tmp.ts.bak"
	mv "$TMP_DIR/errors.out" "$PROJ_DIR/$DEST_DIR/bak/"${BACKUP_DATE}"/errors.out"
	cp "gen_export_out.ts" "gen_export_cur.ts"
	cp "out_empty.ts" "tmp.ts"
	mv "$TMP_DIR/tmp.ts" "tmp.ts"
	mv "tmp.ts" "out.ts"
	cp "out_empty.ts" "tmp.ts"
	popd
	cp "$TMP_DIR/$DEST_DIR/out.ts" "$DEST_DIR/out.ts"
}
function generate_ts_filter_errors {
	grep -Po "$(cat grep.args)" "$@"
}
function generate_ts_with_perl {
	# |{n: Prelude.CF_M_s; t: Types.CF_M_s_; v: "AD_AddToGuideSection";}
	perl gen.pm
}
