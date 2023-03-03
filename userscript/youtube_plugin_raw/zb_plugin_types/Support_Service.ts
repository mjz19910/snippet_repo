type StoreData=import("../zc_child_modules/YTPlugin_Support_Service.user.js").StoreData;
type StoreDescription_Imp<T extends string|number|bigint|boolean,C_Ty extends StoreContentStr>=import("../zc_child_modules/YTPlugin_Support_Service.user.js").StoreDescription<T,C_Ty>;
type StoreDataArgs=
	|["bool_store",StoreDescription_Imp<boolean,"boolean">]
	|["number_store",StoreDescription_Imp<number,"number">]
	;
;