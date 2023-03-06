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
	a: "item"; b: "one"; c: "one";
	z: [T];
};
type make_typeof_name_t<T,U extends T_GetTypeof<T>=T_GetTypeof<T>>={
	a: "item"; b: "one"; c: "typeof_name";
	z: [U];
};
type make_instance_name_t_1={
	a: "item"; b: "one"; c: "instance_name";
	z: ["array"];
};
type make_instance_name_t_2={
	a: "item"; b: "one"; c: "instance_name";
	z: ["unknown"];
};
type make_instance_name_t<U>=U extends any[]? make_instance_name_t_1&{gen: true;}:make_instance_name_t_2&{gen: true;};
type make_instance_name_t_=make_instance_name_t_1|make_instance_name_t_2;
type make_item_group<T>=make_one_t<T>|make_arr_t<T>|make_many_t<T>|make_typeof_name_t<T>|make_instance_name_t<T>|make_instance_name_t_;
type MakeSplitObj<T>={
	[U in make_item_group<T>["c"]]: Extract<make_item_group<T>,{u: U;}>|null;
};
type make_arr_t<T>={
	a: "item"; b: "arr"; c: "arr";
	z: [T[]];
};
type make_many_t<T>={
	a: "item"; b: "many"; c: "many";
	z: [T[][]];
};
type DB_NS_TypeStr="root_visual_element"|"boolean"|"string"|"number"|"keys";
type StoredChangesItem={
	a: "root_visual_element"; d: string;
	z: [make_item_group<number>];
}|{
	a: "number"; d: string;
	z: [make_item_group<number>];
}|{
	a: "string"; d: string;
	z: [make_item_group<string>];
}|{
	a: "keys"; d: string;
	z: [make_item_group<number|string>];
}|{
	a: "boolean"; d: string;
	z: [make_item_group<boolean>];
};
