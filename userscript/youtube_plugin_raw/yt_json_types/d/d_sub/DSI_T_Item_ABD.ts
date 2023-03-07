type DSI_T_Item_ABD<T_Tag1 extends keyof J_StoreTypeMap,T>={
	// ^ SI = StorableItem
	a: "SI:T:D"; b: "boxed_id"; d: T_Tag1;
	// ^ d = type 
	// * (DSS)
	key: `boxed_id:${T_Tag1}:${string}`;
	z: [DIZ_Item_AB<string,T>];
	descriptive_name?: "boxed_store";
};