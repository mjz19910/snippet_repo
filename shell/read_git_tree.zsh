#!/bin/zsh
x () {
	git_file_tree_data=$(git cat-file tree $1)
    va=(${(f)git_file_tree_data})
	tree_result=$({
		d_read(){
			file=
			exc=0
			r_act(){
				IFS= read -r -d "" file
				exc=$?
				return $exc
			}
			r_act || printf "$file";
			return $exc
		}
            while d_read
            do
                    printf "$file\n"
            done
	} <<< $va)
    cf_info=(${(f)tree_result})
	blob_hash=$(echo -n $cf_info[2]|xxd -ps)
    echo ""${cf_info[1]}" ---------------"
    git cat-file blob $blob_hash
    echo
}
blob_read(){
	git_file_tree_data=$(git cat-file tree $1)
    va=(${(f)git_file_tree_data})
	ci2=${git_file_tree_data//$'\0'/:GIT_SEP:}
	cf_info=(${(s/:GIT_SEP:/)ci2})
	file_flags=(${(s/ /)cf_info[1]})
	blob_hash=$(xxd -ps <<<$cf_info[2])
	echo $file_flags[1] blob $blob_hash"    "$file_flags[2]
}
blob_read "$@"