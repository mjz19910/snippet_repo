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
type DB_NS_TypeStr="root_visual_element"|"boolean"|"string"|"number"|"keys";
/** @typedef {"root_visual_element"|"boolean"|"string"|"number"|"keys"} DB_NS_TypeStr */
type StoredChangesItem=
	["number"|"root_visual_element",string,["one",number]|["arr",number[]]]
	|["keys"|"string",string,["one",string]|["arr",string[]]]
	|["boolean",string,["one",boolean]|["arr",boolean[]]]
	;
;
