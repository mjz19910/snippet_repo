
export type Join<T extends string[], U_arg extends string = ","> =
	string[] extends T ? string : T extends [] ? "" : T extends [infer U extends string, infer C extends string, ...infer Z] ? Z extends string[] ?
	Join<Z, U_arg> extends "" ? `${U}${U_arg}${C}` :
	Join<Z, U_arg> extends string ? `${U}${U_arg}${C}${U_arg}${Join<Z, U_arg>}` : `${U}${U_arg}${C}` : `${U}${U_arg}${C}` :
	T extends [infer C extends string, ...infer U] ?
	U extends string[] ? Join<U, U_arg> extends "" ? `${C}` : Join<U, U_arg> extends string ? `${C}${U_arg}${Join<U, U_arg>}` : C : C :
	T[0]
	;
;
function join_as_js<T extends string[], U_arg extends string = ",">(t: T, u_arg: U_arg) {
	function is<_U>(x: string[], _e: "extends", _f: (x: _U) => void) { x; return Math.random() > 0.5; }
	if (is(t, "extends", (_u: string[]) => void 0)) {

	}
	u_arg;
}
