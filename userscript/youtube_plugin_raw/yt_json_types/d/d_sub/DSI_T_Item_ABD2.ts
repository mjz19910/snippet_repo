type DSI_T_Item_ABD2<T_Type extends string,T_Tag2 extends string,Z>={
	// ^ SI = StorableItem
	key: `boxed_id:${T_Type}:${T_Tag2}`;
	a: "boxed_store"; b: "boxed_id"; d: T_Type; w: "/key/a/b/d/w/z"; z: [Z];
};