type StoreDescription<T>={
	new_data: [string,make_one_t<T>|make_arr_t<T>][];
	data: [string,make_arr_t<T>|make_many_t<T>][];
	index: Map<string,number>;
	content: "number"|"keys"|"boolean"|"root_visual_element"|"string";
	type: T extends number? "number":T extends string? "string":T extends boolean? "boolean":T extends string? "string":"unknown";
};
type make_one_t<T>=["one",T];
type make_arr_t<T>=["arr",T[]];
type make_many_t<T>=["many",T[][]];