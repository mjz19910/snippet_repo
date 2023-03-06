// ^ SI = StorableItem
type TSI_Item_ABD<T,T_Type extends string,T_Tag2 extends string>={
	a: "boxed_store"; b: "boxed_id"; d: T_Type;
	key: `boxed_id:${T_Type}:${T_Tag2}`;
	z: [{
		a: "store"; b: T_Tag2;
		z: [make_item_group<T>];
	}];
};
