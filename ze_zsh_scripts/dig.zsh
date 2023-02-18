function do_dig() {
	a3="${a2[-1]}"
	printf "$a3"
	echo /tmp/dig_res.$a2.*(N) | xargs -n 1 bash -c 'echo -n >"$1"' v
	echo rr1.sn-${a2}n{{0..9},{a..z}}{{0..9},{a..z}}.googlevideo.com | stdbuf -i0 -o0 -e0 xargs -n 200 -P 30 zsh -c '. ./dig.zsh child '$a2' "$@"'
	cat /tmp/dig_res.$a2.*
}
function run {
	pushd $(dirname $1)
	a2="$2"
	eval '{ do_dig $2; } always { popd; }'
}
function dig_batch() {
	pushd $(dirname $1)
	a2="$2"
	eval '{ do_dig $2; } always { popd; }'
}
function run_child {
	printf "."
	TF0=$(mktemp /tmp/dig_res.$1.XXX)
	shift
	rm $TF0
	TF="${TF0[0, -3]}"
	stdbuf -oL -eL dig @1.1.1.1 +time=40 +https +noall +answer "$@" >>$TF
}
ARG_NUM=$#@
if (($ARG_NUM == 0)); then
	MODE="failure"
else
	MODE=$1
	shift
fi
case $MODE in
"dig")
	run $0 $1
	;;
"dig_batch")
	dig_batch $0 $1
	;;
"child")
	run_child "$@"
	;;
"failure")
	echo "$0 dig [section]"
	;;
esac
