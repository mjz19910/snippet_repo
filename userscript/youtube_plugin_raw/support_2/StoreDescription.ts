type StoreContentStr="number"|"keys"|"boolean"|"root_visual_element"|"string"|"bigint";
type StoreGetType<T>=T extends bigint? "bigint":T extends number? "number":T extends string? "string":T extends boolean? "boolean":T extends string? "string":"unknown";
type make_item_group<T>=make_one_t<T>|make_arr_t<T>|make_many_t<T>;
type V_StoreBigint=StoreDescription<bigint,"bigint">;
type V_StoreBool=StoreDescription<boolean,"boolean">;
type V_StoreKeys=StoreDescription<number|string,"keys">;
type V_StoreNumber=StoreDescription<number,"number">;
type V_StoreString=StoreDescription<string,"string">;
type V_StoreVE=StoreDescription<number,"root_visual_element">;
type G_StoreDescriptions=
	|V_StoreBigint
	|V_StoreBool
	|V_StoreKeys
	|V_StoreNumber
	|V_StoreString
	|V_StoreVE
	;
;
type make_one_t<T>={type: "one",value: T;};
type make_arr_t<T>={type: "arr",value: T[];};
type make_many_t<T>={type: "many",value: T[][];};
type DB_NS_TypeStr="root_visual_element"|"boolean"|"string"|"number"|"keys";
/** @typedef {"root_visual_element"|"boolean"|"string"|"number"|"keys"} DB_NS_TypeStr */
type StoredChangesItem={
	type: "root_visual_element";
	tag: string;
	value: make_item_group<number>;
}|{
	type: "number";
	tag: string;
	value: make_item_group<number>;
}|{
	type: "string";
	tag: string;
	value: make_item_group<string>;
}|{
	type: "keys";
	tag: string;
	value: make_item_group<number|string>;
}|{
	type: "boolean";
	tag: string;
	value: make_item_group<boolean>;
};
