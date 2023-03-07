// ~ SI = StorableItem
// ~ d = type 
// ~ a = is @type {{is: "SI:T:D"}}
type DSI_T_Item_ABD<T_Tag1 extends keyof J_StoreTypeMap,T>={
	key: `boxed_id:${T_Tag1}:${string}`;
	a: "SI:T:D"; b: "boxed_id"; d: T_Tag1; w: "/key/a/b/d/w/z"; z: [T];
	descriptive_name?: "boxed_store";
};