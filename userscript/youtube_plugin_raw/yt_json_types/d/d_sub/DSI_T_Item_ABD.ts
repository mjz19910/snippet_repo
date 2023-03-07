type DSI_T_Item_ABD<T_Tag1 extends keyof J_StoreTypeMap,T>={
	key: `boxed_id:${T_Tag1}:${string}`;
	a: "SI:T:D"; b: "boxed_id"; d: T_Tag1; w: "/key/a/b/d/w/z"; z: [T];
	descriptive_name?: "boxed_store";
	renames_arr?: [
		DRN_KeyIs<"SI:T:D">,
		DRN_KeyType<T_Tag1>,
	];
};