function do_dig() {
	printf "."
	echo $$ >/tmp/dig_res.$a2.pid
	echo /tmp/dig_res.$a2.* | xargs -n 1 bash -c 'echo -n >"$1"' v
	echo $$ >/tmp/dig_res.$a2.pid
	echo "rr1.sn-"$a2"n"{{0..9},{a..z}}{{0..9},{a..z}}".googlevideo.com" | stdbuf -i0 -o0 -e0 xargs -n 25 -P 30 zsh -c '. ./dig.zsh child '$a2' "$@"'
	list=(/tmp/dig_res.$a2.*)
	TF_2=$(mktemp /tmp/dig_res.$1.out.XXX)
	cat $list >> $TF_2
	if ((`wc -l <$TF_2` != 0)); then
		foo=$(<$TF_2)
		printf "[$a2]\n%s\n" $foo
	fi
}
function run() {
	pushd -q $SOURCE_DIR
	a2="$1"
	do_dig "$a2"
	popd -q
}
function dig_batch() {
	pushd -q $SOURCE_DIR
	a2="$1"
	do_dig "$a2"
	popd -q
}
function run_child() {
	TF=$(mktemp /tmp/dig_res.$1.XXX)
	shift
	stdbuf -oL -eL dig @1.1.1.2 +time=40 +noall +answer +https "$@" >>"$TF"
}
ssd() {
	SOURCE_DIR=`dirname $1`
}
SD="${BASH_SOURCE[0]}";
if [[ "z$SD" == "z" ]]; then
	ssd $0
else
	SOURCE_DIR=$(dirname "$SD")
fi;
if [[ ${#@} -eq "0" ]]; then
	MODE="failure"
else
	MODE=$1
	shift
fi
case $MODE in
"dig")
	run $1;
	;;
"dig_batch")
	dig_batch $1;
	;;
"child")
	run_child "$@";
	;;
"failure")
	echo "$0 dig [section]";
	;;
esac;
