
export type dbg_unexpected={
	type: "unexpected";
	data: {
		result: {
			type: "hidden-var";
			var: string;
		}|{type: "no-var";};
		return: unknown;
	};
};
