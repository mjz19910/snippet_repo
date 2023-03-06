START_PATH=$0
main() {
	stty -echoctl
	ctrl_c() {
		printf "\n\n\n\n"
		return 1
	}
	trap "" SIGINT
	{
		printf "%s\0" /dev/shm/lock.pid.*(N) | xargs -0 rm
		export F=/dev/shm/lock.pid.$$
		touch $F
		(
			exec 4<>$F
			flock 4
			pidof lzma | cut -d " " -f 1- | xargs -rP 2 -n 1 zsh -c 'echo "start_args" $@;. '$START_PATH' resume_pid $@' ''
			exec 4>&-
			echo done
		) &
		(
			echo "w"
			exec {lock_pid}<$F
			exec {lock_1}</dev/shm/lock.1
			exec {lock_2}</dev/shm/lock.2
			exec {done}</dev/shm/lock.done
			exec {notify}</dev/shm/lock.notify
			exec {respond}</dev/shm/lock.respond
			while true; do
				flock -w 0 $lock_pid && {
					# printf '\e[8B'
					return
				}
				while false && sleep 0.02; do
					flock -w 0 $done && break
				done
				# printf '\e[H\e[2J[cls]\r'
				# printf '\eM'
				# printf '\e[1B'
				flock $lock_1
				sleep 0.02
				flock -u $lock_1
				flock $lock_1
				sleep 0.02
				flock -u $lock_1
				flock $lock_1
				sleep 0.02
				flock -u $lock_1
				sleep 0.5
			done
		)
	}
}
resume_pid() {
	sleep 0.$(shuf -i1-6 -n1)
	echo "[resume_pid]" $@
	kill -CONT $@
	trap "" SIGINT

	while [ "${#@}" -gt "0" ]; do
		echo $1
		exec {lock_1}<>/dev/shm/lock.1
		exec {lock_2}<>/dev/shm/lock.2
		exec {done}<>/dev/shm/lock.done
		exec {notify}<>/dev/shm/lock.notify
		exec {respond}<>/dev/shm/lock.respond
		pv -d $1 2>&1 | {
			while IFS= read -r line; do
				flock $done
				flock $notify
				printf "[l_notify_2]"
				sleep 0.03
				flock -u $notify
				flock $lock_1
				printf '%s\n' "$line"
				sleep 0.1
				flock -u $lock_1
				flock $lock_2
				flock -u $lock_2
				flock u $done
			done
		}
		shift
	done
}
if [ "$#" -eq 0 ]; then
	echo echo "arg_num" "$#"
	$mode
else
	mode=$1
	echo "arg_num" "$#"
	shift
	echo "arg_left" $@
	$mode $@
fi
