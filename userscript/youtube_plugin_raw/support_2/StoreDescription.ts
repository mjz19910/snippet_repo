type StoreContentStr="number"|"keys"|"boolean"|"root_visual_element"|"string"|"bigint";
type StoreGetType<T>=T extends bigint? "bigint":T extends number? "number":T extends string? "string":T extends boolean? "boolean":T extends string? "string":"unknown";
type make_item_group<T>=make_one_t<T>|make_arr_t<T>|make_many_t<T>;
type V_StoreBool=StoreDescription_Imp<boolean,"boolean">;
type V_StoreBigint=StoreDescription_Imp<bigint,"bigint">;
type G_StoreDescriptions=
	|V_StoreBigint
	|V_StoreBool
	|V_StoreKeys
	|V_StoreNumber
	|V_StoreString
	|V_StoreVE
	;
;
type V_StoreNumber=StoreDescription_Imp<number,"number">;
type V_StoreVE=StoreDescription_Imp<number,"root_visual_element">;
type V_StoreString=StoreDescription_Imp<string,"string">;
type V_StoreKeys=StoreDescription_Imp<number|string,"keys">;
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
