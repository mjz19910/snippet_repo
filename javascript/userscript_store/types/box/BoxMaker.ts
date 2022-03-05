export type BoxMaker<A, T_Type> =
	(
		make_new: <T>(do_box: () => T, ...a: A[]) => T_Type,
		value: typeof Function
	) => T_Type;
