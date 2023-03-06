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
			exec 5>>$F
			exec 6>>/dev/shm/lock.1
			exec 7>>/dev/shm/lock.2
			exec 8>>/dev/shm/lock.done
			while true; do
				flock -w 0 5 && {
					echo "e"
					# printf '\e[2A'
					return
				}
				sleep 0.5
				flock 8
				flock 6
				printf '\e[4B'
				flock -u 7
				sleep 0.25
				printf '\e[4B'
				sleep 0.25
				# printf '\e[2A'
				flock -u 6
				flock 7
				flock -u 8
			done
		)
	}
}
resume_pid() {
	echo "[resume_pid]" $@
	sleep $(shuf -i1-4 -n1)
	kill -CONT $@
	trap "" SIGINT

	while [ "${#@}" -gt "0" ]; do
		echo $1
		exec 6>>/dev/shm/lock.1
		exec 7>>/dev/shm/lock.2
		exec 8>>/dev/shm/lock.done
		pv -d $1 | {
			while IFS= read -r line; do
				flock 6
				echo "locked 6"
				printf '%s\n' "$line"
				flock -u 6
				echo "unlocked 6"
				flock 7
				echo "locked 7"
				printf '%s\n' "$line"
				flock -u 7
				echo "unlocked 7"
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
