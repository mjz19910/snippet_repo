type StoreData=import("../zc_child_modules/YTPlugin_Support_Service.user.js").StoreData;
type StoreDescription<T extends GS_StoreType>=import("../zc_child_modules/YTPlugin_Support_Service.user.js").StoreDescription<T>;
type T_StoreDataInput<T_Type extends GS_StoreType>={
	type: T_Type,description: StoreDescription<T_Type>;
};
type StoreDataInput=
	|T_StoreDataInput<"bigint">
	|T_StoreDataInput<"boolean">
	|T_StoreDataInput<"keys">
	|T_StoreDataInput<"number">
	|T_StoreDataInput<"root_visual_element">
	|T_StoreDataInput<"string">
	;
;