set -x
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
	cp "out_empty.ts" "generated/out.ts" || exit 1
	cp "gen_export_tmp.ts" "gen_export_cur.ts" || exit 1
	mv "generated/tmp.ts" "generated/tmp.ts.bak" || exit 1
	cp "out_empty.ts" "generated/tmp.ts" || exit 1
}
function generate_ts_backup_output {
	cp -ru "$DEST_DIR/generated" "$TMP_DIR/$DEST_DIR"
	pushd "$DEST_DIR"
	mkdir -p "$PROJ_DIR/$DEST_DIR/bak/$BACKUP_DATE"
	cp "generated/out.ts" "$PROJ_DIR/$DEST_DIR/bak/"${BACKUP_DATE}"/out.ts.bak" || exit 1
	pushd "$TMP_DIR/$DEST_DIR"
	cp "generated/out.ts" "generated/out.ts.bak" || exit 1
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
	mkdir -p "$PROJ_DIR/$DEST_DIR/bak/$BACKUP_DATE"
	mv "generated/tmp.ts" "$PROJ_DIR/$DEST_DIR/bak/$BACKUP_DATE/tmp.ts.bak" || exit 1
	mv "$TMP_DIR/errors.out" "$PROJ_DIR/$DEST_DIR/bak/$BACKUP_DATE/errors.out"
	cp "gen_export_out.ts" "gen_export_cur.ts" || exit 1
	cp "out_empty.ts" "generated/tmp.ts" || exit 1
	mv "$TMP_DIR/tmp.ts" "generated/tmp.ts" || exit 1
	mv "generated/tmp.ts" "generated/out.ts" || exit 1
	cp "out_empty.ts" "generated/tmp.ts" || exit 1
	popd
	cp "$TMP_DIR/$DEST_DIR/generated/out.ts" "$DEST_DIR/generated/out.ts" || exit 1
}
function generate_ts_filter_errors {
	grep -Po "$(cat grep.args)" "$@"
}
function generate_ts_with_perl {
	# |{n: Prelude.CF_M_s; t: Types.CF_M_s_; v: "AD_AddToGuideSection";}
	perl gen.pm
}
