type StoreContentStr="number"|"keys"|"boolean"|"root_visual_element"|"string";
type StoreDescription<T,C_Ty extends StoreContentStr>={
	new_data: [string,make_item_group<T>][];
	data: [string,make_item_group<T>][];
	key_index: Map<string,number>;
	content: C_Ty;
	type: StoreGetType<T>;
};
type StoreGetType<T>=T extends number? "number":T extends string? "string":T extends boolean? "boolean":T extends string? "string":"unknown";
type make_item_group<T>=make_one_t<T>|make_arr_t<T>|make_many_t<T>;
type G_StoreDescriptions=StoreDescription<boolean,"boolean">|G_StoreNumDescription|G_StoreStringDescription;
type G_StoreNumDescription=StoreDescription<number,"number">|StoreDescription<number,"root_visual_element">;
type G_StoreStringDescription=StoreDescription<string,"string">|StoreDescription<string,"keys">;
type make_one_t<T>=["one",T];
type make_arr_t<T>=["arr",T[]];
type make_many_t<T>=["many",T[][]];
type DB_NS_TypeStr="root_visual_element"|"boolean"|"string"|"number"|"keys";
/** @typedef {"root_visual_element"|"boolean"|"string"|"number"|"keys"} DB_NS_TypeStr */
type StoredChangesItem=
	|["number"|"root_visual_element",string,make_item_group<number>]
	|["keys"|"string",string,make_item_group<string>]
	|["boolean",string,make_item_group<boolean>]
	;
;
