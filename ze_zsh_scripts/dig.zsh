TMP_DIR="/tmp"
function run_dig_main_impl() {
	RESULT_FILE="$TMP_DIR/result.dig_batch.$a2"
	if [[ -f "$TMP_DIR/result.dig_batch.$a2" ]]; then
		if (($(wc -l <"$RESULT_FILE") != 0)); then
			foo=$(<"$RESULT_FILE")
			printf "[$a2]\n%s\n" "$foo"
		fi
		return 0
	fi
	printf "\r.\e[2C"
	printf "%s\0" $TMP_DIR/out.dig_batch.$a2.*(N) | xargs -0r rm
	PID_FILE="$TMP_DIR/pid.dig_batch.$a2"
	echo $$ >"$PID_FILE"
	printf "%s\0" rr1.sn-${a2}n{{0..9},{a..z}}{{0..9},{a..z}}.googlevideo.com |
		stdbuf -i0 -o0 -e0 xargs -0rn35 -P100 zsh -c '. ./dig.zsh run_child '$a2' "$@"'
	list=($TMP_DIR/out.dig_batch.$a2.*)
	cat $list >>"$RESULT_FILE"
	if (($(wc -l <"$RESULT_FILE") != 0)); then
		foo=$(<"$RESULT_FILE")
		printf "\n[$a2]\n%s\n" "$foo"
	fi
	rm "$list"
	printf "\r \e[2C"
	rm "$PID_FILE"
}
function run_dig_main() {
	pushd -q $S_DIR
	a2="$1"
	run_dig_main_impl "$a2"
	popd -q
}
function run_dig_batch() {
	pushd -q $S_DIR
	a2="$1"
	run_dig_main_impl "$a2"
	popd -q
}
function run_child() {
	a1=$1
	TF=$(mktemp $TMP_DIR/out.dig_batch.$1.XXX)
	shift
	if ((${#@} == 0)); then
		return 0
	fi
	if ((${#@} > 10)); then
		printf "\r \e[2C"
		sleep $(shuf -i0-1 -n1).$(shuf -i0-9 -n1)
	fi
	eval 'printf "\r\e[1C${@[1][12]}${@[1][14,-18]}"'
	printf "\r.\e[2C"
	stdbuf -oL -eL dig "@1.1.1.2" +time=40 +noall +answer +https "$@" >>"$TF"
	printf "\r!\e[2C"
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
function get_abc_opt {
	IFS=,
	z1=({{0..9},{a..z}})
	echo "${z1[*]}"
}
function dig_user_run {
	a2=${1}"__n"${2}"_"
	RESULT_FILE="$TMP_DIR/result.dig_user.$a2"
	if [[ -f "$RESULT_FILE" ]]; then
		if (($(wc -l <"$RESULT_FILE") != 0)); then
			foo=$(<"$RESULT_FILE")
			printf "[$a2]\n%s\n" "$foo"
		fi
		return 0
	fi
	touch /tmp/dig_term_lock
	echo $TMP_DIR/dig_res.t.*(N) | xargs -r rm
	z=$(get_abc_opt)
	eval 'printf "%s\0" rr1.sn-'$1{$z}{$z}n${2}{$z}'.googlevideo.com' | stdbuf -i0 -o0 -e0 xargs -0rn32 -P60 zsh -c '. ./dig.zsh dig_user_child "$@"' ''
	list=($TMP_DIR/dig_res.t.*)
	cat $list >>"$RESULT_FILE"
	if (($(wc -l <"$RESULT_FILE") != 0)); then
		foo=$(<"$RESULT_FILE")
		printf "\n[$a2]\n%s\n" "$foo"
	fi
	rm $list
}
function dig_user {
	pushd -q $S_DIR
	eval '{dig_user_run "$@";} always {popd -q}'
}
function lock_printf {
	(
		unset foo
		exec {foo}</tmp/dig_term_lock
		flock -e $foo
		sleep 0.001
		printf $@
		exec {foo}<&-
	)
}
function term_pos() {
	echo -ne "\033[6n"
	read -s -d\[ garbage
	unset garbage
	read -s -d R POS_STR
	eval 'TERM_POS=(${(s/;/)POS_STR});'
	((TERM_POS[2] += 1))
	printf "\e[${TERM_POS[1]};${TERM_POS[2]}f!"
}
function dig_user_child {
	arg_num_1=${#1}
	n=$arg_num_1
	cn=$COLUMNS
	DNS_TAG_LEN=6
	TERM_RETURN_NUM_LINE_LEN=6
	PADDING_LEN=2
	SPACE_CHAR=1
	((cn -= n + DNS_TAG_LEN + TERM_RETURN_NUM_LINE_LEN + SPACE_CHAR * 2 + PADDING_LEN))
	printf "\e7\e[H\e["${cn}"C [dns]:$1 \n\e8"
	TF=$(mktemp $TMP_DIR/dig_res.t.XXX)
	sleep $(shuf -i0-2 -n1).$(shuf -i0-9 -n1)
	printf "."
	dig @1.1.1.2 +time=3 +https +noall +answer "$@" >$TF
	if (($(wc -l <$TF) != 0)); then
		printf "!"
	fi
}
case $MODE in
"dig")
	run_dig_main $1
	;;
"run_child")
	run_child "$@"
	;;
"failure")
	echo "$0 dig [section]"
	;;
*)
	$MODE "$@"
	;;
esac
