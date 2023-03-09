type DSI_T_Item_ABD<T_Type extends keyof J_StoreTypeMap,T>={
	key: `boxed_id:${T_Type}:${string}`;
	a: "/db/key/a/b/d/z"; b: "boxed_id"; d: T_Type; z: [DI_T_KV_Z<string,make_item_group<T>>];
	descriptive_name?: "boxed_store";
	renames_arr?: DEX_Renames<[
		DRN_KeyIs<"/db/key/a/b/d/z">,
		DRN_KeyType<T_Type>,
	]>;
};