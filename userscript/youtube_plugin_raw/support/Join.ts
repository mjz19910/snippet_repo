type Join<T extends string[],U_arg extends string=",">=
	string[] extends T? string:
	T extends []? "":
	T extends [infer U extends string,infer C extends string,...infer Z]?
	Z extends string[]?
	Join<Z,U_arg> extends ""?`${U}${U_arg}${C}`:
	Join<Z,U_arg> extends string?
	`${U}${U_arg}${C}${U_arg}${Join<Z,U_arg>}`:
	[`:4:${U}${U_arg}${C}`,Z]:
	`:3:${U}${U_arg}${C}`:
	T extends [infer C extends string,...infer U]?
	U extends string[]?
	Join<U,U_arg> extends ""?`${C}`:
	Join<U,U_arg> extends string? `:6:${C}${U_arg}:j2:|${Join<U,U_arg>}`:
	`:1:${C}`:
	`:2:${C}`:
	T extends [infer C extends string]?
	C:
	T[0];