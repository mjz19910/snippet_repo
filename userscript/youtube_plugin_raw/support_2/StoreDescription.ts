type StoreContentStr="number"|"keys"|"boolean"|"root_visual_element"|"string"|"bigint";
type StoreGetType<T>=
	T extends bigint? "bigint":
	T extends boolean? "boolean":
	T extends number? "number":
	T extends string? "string":
	"unknown"
	;
;
type StoreTypeMap={
	bigint: bigint;
	boolean: boolean;
	keys: number|string;
	number: number;
	root_visual_element: number;
	string: string;
};
type StoreStrMap={
	bigint: ["bigint"];
	boolean: ["boolean"];
	keys: ["number","string"];
	number: ["number"];
	root_visual_element: ["number"];
	string: ["string"];
};
type V_StoreBigint=StoreDescription<"bigint">;
type V_StoreBool=StoreDescription<"boolean">;
type V_StoreKeys=StoreDescription<"keys">;
type V_StoreNumber=StoreDescription<"number">;
type V_StoreString=StoreDescription<"string">;
type V_StoreVE=StoreDescription<"root_visual_element">;
type G_StoreDescriptions=
	|V_StoreBigint
	|V_StoreBool
	|V_StoreKeys
	|V_StoreNumber
	|V_StoreString
	|V_StoreVE
	;
;
type make_one_t<T>={
	is: "item"; type: "one"; special: "one";
	info_arr: [T];
	m1_value_39392_one: {};
};
type make_typeof_name_t<T,U extends T_GetTypeof<T>=T_GetTypeof<T>>={
	is: "item"; type: "one"; special: "typeof_name";
	info_arr: [U];
};
type make_instance_name_t<U>={
	is: "item"; type: "one"; special: "instance_name";
	info_arr: [U extends any[]? "array":"unknown"];
};
type make_item_group<T>=make_one_t<T>|make_arr_t<T>|make_many_t<T>|make_typeof_name_t<T>|make_instance_name_t<T>;
type make_arr_t<T>={
	is: "item"; type: "arr"; special: "arr";
	info_arr: [T[]];
	m1_value_39392_arr: {};
};
type make_many_t<T>={
	is: "item"; type: "many"; special: "many";
	info_arr: [T[][]];
	m1_value_39392_many: {};
};
type DB_NS_TypeStr="root_visual_element"|"boolean"|"string"|"number"|"keys";
type StoredChangesItem={
	type: "root_visual_element";
	tag: string;
	info_arr: [make_item_group<number>];
}|{
	type: "number";
	tag: string;
	info_arr: [make_item_group<number>];
}|{
	type: "string";
	tag: string;
	info_arr: [make_item_group<string>];
}|{
	type: "keys";
	tag: string;
	info_arr: [make_item_group<number|string>];
}|{
	type: "boolean";
	tag: string;
	info_arr: [make_item_group<boolean>];
};
