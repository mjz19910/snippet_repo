function run {
	echo /tmp/dig_res.* | xargs -n 1 bash -c 'echo -n > $1' v
	echo rr1.sn-{a,h,n,o,p}{g,p}{v,m}{e,s,l}{l,y,z}n{es,6d,dd,ee,lk}.googlevideo.com | stdbuf -i0 -o0 -e0 xargs -n 100 -P 25 zsh -c '. ./dig.zsh child "$@"'
	eval 'cat /tmp/dig_res.*'
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
run)
	run
	;;
child)
	run_child "$@"
	;;
esac
