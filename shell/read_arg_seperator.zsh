function separate_args() {
	separate_args0=()
	separate_args1=()
	local mode=0
	for arg in $@
	do
		if [[ $arg = -- ]]
		then
			mode=1
			continue
		fi
		if [[ $mode -eq 0 ]]
		then
			separate_args0+=$arg
		else
			separate_args1+=$arg
		fi
	done
}
