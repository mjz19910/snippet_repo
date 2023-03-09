// ~ SI = StorableItem
type DSI_T_Item_ABD2<T_Type extends string,T_Tag2 extends string,T>={
	key: `boxed_id:${T_Type}:${T_Tag2}`;
	a: "/key/a/b/d/z"; b: "boxed_id"; d: T_Type; z: [T];
};