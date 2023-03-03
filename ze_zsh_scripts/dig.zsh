START_PATH=$0
TMP_DIR="/tmp"
DIG_SILENT=false

function dig_user {
	pushd -q $S_DIR
	eval '{dig_user-run "$@";} always {popd -q}'
}
function dig_final {
	pushd -q $S_DIR
	eval '{dig_final-run "$@";} always {popd -q}'
}
function dig_main() {
	pushd -q $S_DIR
	eval '{dig_main-run "$@";} always {popd -q}'
}
function dig_batch() {
	dig_main "$@"
}

function read_result() {
	if [ "$DIG_SILENT" != "true" ] && (($(wc -l <"$2") != 0)); then
		foo=$(<"$2")
		printf "$1\n%s\n" "$foo"
	fi
}

function dig_main-run() {
	a2="$1"
	RESULT_FILE="$TMP_DIR/result.dig_batch.$a2"
	if [[ -f "$RESULT_FILE" ]]; then
		read_result "[$a2]" "$RESULT_FILE"
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
	read_result_after_dig "$a2" "$RESULT_FILE"
	rm "$list"
	printf "\r \e[2C"
	rm "$PID_FILE"
}
function read_result_after_dig {
	if [ "$DIG_SILENT" != "true" ] && (($(wc -l <"$2") != 0)); then
		foo=$(<"$2")
		printf "\n[$1]\n%s\n" "$foo"
	else
		printf "\n"
	fi
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
	MODE="print-usage"
else
	MODE=$1
	shift
fi
function get_abc_opt {
	IFS=,
	local z1=({{0..9},{a..z}})
	echo "${z1[*]}"
}
function get_google_opt {
	IFS=,
	local z1=({6,7,d,e,k,l,r,s,y,z})
	echo "${z1[*]}"
}
function dig_user-run {
	a2=${1}"__n"${2}"_"
	export TMP_TAG=user
	JOB_NUMBER=90
	RESULT_FILE="$TMP_DIR/dig/$TMP_TAG/out/result.$a2"
	if [[ -f "$RESULT_FILE" ]]; then
		read_result "[$a2]" "$RESULT_FILE"
		return 0
	fi
	touch /tmp/dig_term_lock
	mkdir -p $TMP_DIR/dig/$TMP_TAG/tmp $TMP_DIR/dig/$TMP_TAG/out
	echo $TMP_DIR/dig/$TMP_TAG/tmp/result.*(N) | xargs -r rm
	z=$(get_abc_opt)
	gz=$(get_google_opt)
	eval 'printf "%s\0" rr1.sn-'$1{$z}{$z}n${2}{$gz}'.googlevideo.com' | stdbuf -i0 -o0 -e0 xargs -0rn42 -P"$JOB_NUMBER" zsh -c '. ./dig.zsh dig_user-child "$@"' ''
	list=($TMP_DIR/dig/$TMP_TAG/tmp/result.*)
	cat $list >>"$RESULT_FILE"
	read_result_after_dig "$a2" "$RESULT_FILE"
	rm $list
}
function dig_user-child {
	arg_num_1=${#1}
	n=$arg_num_1
	cn=$COLUMNS
	DNS_TAG_LEN=6
	TERM_RETURN_NUM_LINE_LEN=6
	PADDING_LEN=2
	SPACE_CHAR=1
	((cn -= n + DNS_TAG_LEN + TERM_RETURN_NUM_LINE_LEN + SPACE_CHAR * 2 + PADDING_LEN + ${#TMP_TAG} + 1))
	printf "\e7\e[H\e["${cn}"C [dns.$TMP_TAG]:$1 \n\e8"
	TF=$(mktemp $TMP_DIR/dig/$TMP_TAG/tmp/result.XXX)
	exec 4>>$TF
	flock -e 4
	sleep $(shuf -i0-2 -n1).$(shuf -i0-9 -n1)
	printf "."
	dig @1.1.1.2 +time=20 +tries=2 +https +noall +answer "$@" >&4
	if [[ -f "$TF" ]] && (($(wc -l <$TF) != 0)); then
		eval 'printf "![${1[11,12]}:${1[14,15]}]"'
	fi
	exec 4<&-
}
function dig_final-run {
	a2=${1}"n__"
	export TMP_TAG=final
	RESULT_FILE="$TMP_DIR/dig/$TMP_TAG/out/result.$a2"
	if [[ -f "$RESULT_FILE" ]]; then
		read_result "[$a2]" "$RESULT_FILE"
		return 0
	fi
	touch /tmp/dig_term_lock
	mkdir -p $TMP_DIR/dig/$TMP_TAG/tmp $TMP_DIR/dig/$TMP_TAG/out
	echo $TMP_DIR/dig/$TMP_TAG/tmp/result.*(N) | xargs -r rm
	z=$(get_google_opt)
	eval 'printf "%s\0" rr1.sn-'$1n{$z}{$z}'.googlevideo.com' | stdbuf -i0 -o0 -e0 xargs -0rn4 -P50 zsh -c '. ./dig.zsh dig_final-child "$@"' ''
	list=($TMP_DIR/dig/$TMP_TAG/tmp/result.*)
	cat $list >>"$RESULT_FILE"
	read_result_after_dig "$a2" "$RESULT_FILE"
	rm $list
}
function dig_final-child {
	arg_num_1=${#1}
	n=$arg_num_1
	cn=$COLUMNS
	DNS_TAG_LEN=6
	TERM_RETURN_NUM_LINE_LEN=6
	PADDING_LEN=2
	SPACE_CHAR=1
	((cn -= n + DNS_TAG_LEN + TERM_RETURN_NUM_LINE_LEN + SPACE_CHAR * 2 + PADDING_LEN + ${#TMP_TAG} + 1))
	printf "\e7\e[H\e["${cn}"C [dns.$TMP_TAG]:$1 \n\e8"
	TF=$(mktemp $TMP_DIR/dig/$TMP_TAG/tmp/result.XXX)
	exec 4>>$TF
	flock -e 4
	printf "."
	dig @1.1.1.2 +time=20 +tries=2 +https +noall +answer "$@" >&4
	if [ -f "$TF" ] && (($(wc -l <$TF) != 0)); then
		eval 'printf "![${1[14,15]}]"'
	fi
	exec 4<&-
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
function gen_type_arr() {
	a1=$1
	a2=${1}"n__"
	DIG_SILENT=true
	dig_final $a1
	echo "[$a2]"
	sort -n <$RESULT_FILE | tail -n +2 | cut -d '.' -f 2 | cut -d - -f 2 | cut -c 7,8 | perl -pe 's/(.+)/"$1",/g'
}

function print-usage {
	echo "$START_PATH dig_main [section]"
}
$MODE "$@"
