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
	exec 4<>$F
	flock 4
	(
		echo "w"
		while sleep 0.5; do
			printf "\\e[[5A"
			exec 5<>$F && echo "e" && return
		done
	)
	pidof lzma | cut -d " " -f 1- | xargs -P 2 -n 1 zsh -c 'echo $@;kill -CONT $@;trap "" SIGINT;pv -d $1;' ''} always {printf "\n\n\n\n\n"
	exec 4>&-
	echo done
}
