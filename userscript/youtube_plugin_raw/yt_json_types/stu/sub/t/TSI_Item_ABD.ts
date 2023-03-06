type TSI_Item_ABD<T_Tag1 extends string,T_Tag2 extends string,T>={
	// ^ SI = StorableItem
	a: "boxed_store"; b: "boxed_id"; d: T_Tag1;
	// ^ d = type 
	// * (DSS)
	key: `boxed_id:${T_Tag1}:${T_Tag2}`;
	z: [DIZ_Item_AB<T_Tag2,T>];
};