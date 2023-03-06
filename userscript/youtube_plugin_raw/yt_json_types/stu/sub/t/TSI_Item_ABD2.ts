type TSI_Item_ABD2<T_Type extends string,T_Tag2 extends string,Z>={
	// ^ SI = StorableItem
	a: "boxed_store"; b: "boxed_id"; d: T_Type;
	key: `boxed_id:${T_Type}:${T_Tag2}`;
	z: [Z];
};
