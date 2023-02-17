function run {
	pushd `dirname $1`;
	function r() {
		echo /tmp/dig_res.* | xargs -n 1 bash -c 'echo -n > $1' v;
		echo rr1.sn-{9gv7l,a5mek}n{{0..9},{a..z}}{{0..9},{a..z}}.googlevideo.com | stdbuf -i0 -o0 -e0 xargs -n 100 -P 25 zsh -c '. ./dig.zsh child "$@"';
		eval 'cat /tmp/dig_res.*';
	}
	eval '{ r; } always { popd; }';
}
function run_child {
	TF0=$(mktemp /tmp/dig_res.XXX)
	rm $TF0
	TF="${TF0[0, 14]}"
	stdbuf -oL -eL dig @1.1.1.1 +time=1 +https +noall +answer "$@" >>$TF
}
ARG_NUM=$#@
if (($ARG_NUM == 0)); then
	MODE="run"
else
	MODE=$1
	shift
fi
case $MODE in
"run")
	run $0;
	;;
"child")
	run_child "$@";
	;;
esac
