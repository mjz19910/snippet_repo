#!/bin/zsh

trace_ip_r () {
	ping -s 0 -n --ttl $2 -c 1 $1
}

trace_ip () {
	trace_ip_r|grep -P "Time to live|bytes from"|perl -p get_ip.pm
}

trace_ip_win_r () {
	ping.exe -l 0 -i $2 -n 1 $1
}

trace_ip_win () {
	trace_ip_win_r $1 $2|grep -P "Reply from"|perl -p get_ip_win.pm
}

ping_host_ttl () {
	last_ip="$IP";
	IP=$(trace_ip "$@");
	if [ "$last_ip" = "" -a "$ip" = "" ]
	then
	return 1
	fi
	if [ "$IP" = "$1" ]
	then
	echo $IP
	return 1
	else
	echo $IP;
	fi
}

ping_host_ttl_win () {
	last_ip="$IP";
	IP=$(trace_ip_win "$@"|perl -pe 's/\r\n/\n/g');
	if [ "$last_ip" = "" -a "$ip" = "" ]
	then
	return 1
	fi
	if [ "$IP" = "$1" ]
	then
	echo $IP
	return 1
	else
	echo $IP;
	fi
}

zsh_traceroute() {
	echo "This crashes windows 10"
	return 1
	eval 'ping_host_ttl '"$1"' '{1..24}' &&'
}

zsh_traceroute_win() {
	eval 'ping_host_ttl_win '"$1"' '{1..24}' &&'
}

zsh_traceroute_each() {
	while ([ "x$1" != "x" ]) do
		x="$1"
		shift
		echo "\n--- ROUTE TO ---\n$x\n---"
		zsh_traceroute_win "$x"
	done
}
