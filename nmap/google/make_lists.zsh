. ./ping_traceroute.zsh


make_route_list () {
	while ([ "x$1" != "x" ]) do
	x="$1"
	shift
	echo "\n--- ROUTE TO ---\n$x\n---"
	zsh_traceroute_win "$x"
	done
}

make_dns_ptr_list_item() {
	as_name="$1"
	shift
	{
		printf "%s\n" "--- G($1) ---"
		eval dig @8.8.4.4 +noall +answer '-x '"$1".{1,33,65,97,129,161,193,225}
	} >tmp/out_"$1" 2>&1
	cat tmp/out_"$1" >&2 >>tmp/dig_list_"$as_name".dns_ptr_list
	rm tmp/out_"$1"
}

make_dns_ptr_list () {
	as_name="$1"
	shift
	while ([ "x$1" != "x" ]) do
	x="$1"
	shift
	make_dns_ptr_list_item "$as_name" "$x" &
	sleep 1
	done
}

make_dns_ptr_list 74.125.0.0.16 74.125.{0..255}
