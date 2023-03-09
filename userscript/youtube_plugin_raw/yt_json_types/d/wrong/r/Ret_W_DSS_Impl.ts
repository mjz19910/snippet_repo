type Ret_W_DSS_Impl<T extends DSI_T_Item_ABD<J,Y>,J extends keyof J_StoreTypeMap,Y>=[
	J,
	string,
	any,// ["1",Y]|["2",Y[]]|["3",any[][]]|["t",string]|["i","array"],
	any,// make_item_group<Y>,
	any,// DI_T_ABZ_MakeItemGroup<string,Y>,
	T
];
