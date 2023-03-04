type StoreData=import("../zc_child_modules/YTPlugin_Support_Service.user.js").StoreData;
type StoreDescription<T extends string|number|bigint|boolean,C_Ty extends StoreContentStr>=import("../zc_child_modules/YTPlugin_Support_Service.user.js").StoreDescription<T,C_Ty>;
type StoreDataArgs=
	|["bigint_store",StoreDescription<bigint,"bigint">]
	|["bool_store",StoreDescription<boolean,"boolean">]
	|["keys_store",StoreDescription<number|string,"keys">]
	|["number_store",StoreDescription<number,"number">]
	|["string_store",StoreDescription<string,"string">]
	|["ve_store",StoreDescription<number,"root_visual_element">]
	;
;