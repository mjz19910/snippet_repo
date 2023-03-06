START_PATH=$0
. "`dirname $START_PATH`/vt100.zsh"

resume_lzma-run() {
	printf '%s\n\n\n\n' $'\n' $'\n' $'\n' $'\n'
	printf '\n\n\n\n'
	pidof lzma | cut -d " " -f 1- | xargs -rP 2 -n 1 zsh -c 'echo "start_args" $@;. '$START_PATH' resume_pid $@' ''
	echo "lzma all done"
}
resume_pid() {
	sleep 0.$(shuf -i1-6 -n1)
	echo "[resume_pid]" $@
	kill -CONT $@
	while [ "${#@}" -gt "0" ]; do
		echo $1
		exec {lock_1}</dev/shm/lock.1
		exec {lock_2}</dev/shm/lock.2
		exec {lock_3}</dev/shm/lock.3
		exec {done}</dev/shm/lock.done
		exec {notify}</dev/shm/lock.notify
		exec {respond}</dev/shm/lock.respond
		printf "[pv_start]\n"
		pv -d $1 2>&1 | {
			while true; do
				IFS= read -r line1 || break
				IFS= read -r line2 || break
				IFS= read -r line3 || break
				IFS= read -r line4 || break
				IFS= read -r line5 || break
				IFS= read -r line6 || break
				savecursor
				printf '\e[14;0f\e[1J'
				restorecursor
				flock $lock_1
				savecursor
				printf '\e[4;0'f
				printf '[1]%s[1]\n' "$line1"
				printf '[2]%s[2]\n' "$line2"
				echo "lock_nb"
				flock -w 0 $lock_2
				echo "lock_res: $?"
				if flock -w 0 $lock_2; then
					printf '\e[12;0'f
					printf '[5.1]%s[5]\n' "$line5"
				else
					flock -u $lock_2
					printf '\e[14;0'f
					printf '[5.3]%s[5]\n' "$line5"
				fi
				printf '[6]%s[6]\n' "$line6"
				flock -u $lock_1
				sleep 0.2
				sleep 0.5
				restorecursor
			done
		}
		shift
	done
}
if [ "$#" -eq 0 ];then
echo "USAGE: $START_PATH resume_lzma-run"
elif [ "$#" -eq 1 ]; then
	$mode
else
	mode=$1
	shift
	$mode $@
fi
