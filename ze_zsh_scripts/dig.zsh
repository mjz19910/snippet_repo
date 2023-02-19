function do_dig() {
	printf "\r.\e[2C"
	echo $$ >/tmp/out.dig_batch.$a2.pid
	find /tmp/ -maxdepth 1 -name 'out.dig_batch.'$a2'.*' | xargs -r truncate -s 0
	echo $$ >/tmp/out.dig_batch_pid.$a2
	printf "%s\0" rr1.sn-${a2}n{{0..9},{a..z}}{{0..9},{a..z}}.googlevideo.com |
		stdbuf -i0 -o0 -e0 xargs -0rn35 -P100 zsh -c '. ./dig.zsh run_child '$a2' "$@"'
	list=(/tmp/dig_res.$a2.*)
	TF_2=$(mktemp /tmp/dig_res.out.$1.XXX)
	cat $list >>$TF_2
	if (($(wc -l <$TF_2) != 0)); then
		foo=$(<$TF_2)
		printf "\n[$a2]\n%s\n" $foo
	fi
	printf "\r \e[2C"
}
function dig() {
	pushd -q $S_DIR
	a2="$1"
	do_dig "$a2"
	popd -q
}
function dig_batch() {
	pushd -q $S_DIR
	a2="$1"
	do_dig "$a2"
	popd -q
}
function run_child() {
	a1=$1
	TF=$(mktemp /tmp/dig_res.$1.XXX)
	shift
	if ((${#@} == 0)); then
		return 0
	fi
	if ((${#@} > 10)); then
		sleep $(shuf -i0-1 -n1).$(shuf -i0-9 -n1)
	fi
	eval 'printf "\r\e[1C${@[1][12]}${@[1][14,-18]}"'
	stdbuf -oL -eL dig "@1.1.1.2" +time=40 +noall +answer +https "$@" >>"$TF"
}
ssd() {
	S_DIR=$(dirname $1)
}
SD="${BASH_SOURCE[0]}"
if [[ "z$SD" == "z" ]]; then
	ssd $0
else
	S_DIR=$(dirname "$SD")
fi
if [[ ${#@} -eq "0" ]]; then
	MODE="failure"
else
	MODE=$1
	shift
fi
function gen_z_get {
	IFS=,
	echo "${z1[*]}"
}
function dig_user {
	echo /tmp/dig_res.t.*(N) | xargs -r rm
	z1=({{0..9},{a..z}})
	z=$(gen_z_get)
	echo "\eD\eD"
	eval 'printf "%s\0" rr1.sn-'$1{$z}{$z}nr{$z}'.googlevideo.com' | stdbuf -i0 -o0 -e0 xargs -0rn32 -P60 zsh -c 'printf "\e7""\e[H\e[2K\r$1 \r""\e8";TF=`mktemp /tmp/dig_res.t.XXX`;sleep $(shuf -i0-2 -n1).$(shuf -i0-9 -n1);printf ".";dig @1.1.1.1 +time=3 +https +noall +answer "$@" > $TF;if ((`wc -l <$TF` != 0)); then printf "\n";cat $TF;fi' ''
}
case $MODE in
"dig")
	dig $1;
	;;
"run_child")
	run_child "$@";
	;;
"failure")
	echo "$0 dig [section]";
	;;
*)
	$MODE "$@";
	;;
esac
