export function fn_box_maker<A,T,T_Box>(make_new_box: (do_box: () => T,...a: A[]) => T_Box,value: {new(): T}): T_Box {
	return make_new_box(() => new value)
}
