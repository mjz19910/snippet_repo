type StoreData=import("../zc_child_modules/YTPlugin_Support_Service.user.js").StoreData;
type StoreDescription<T extends string|number|bigint|boolean,C_Ty extends StoreContentStr>=import("../zc_child_modules/YTPlugin_Support_Service.user.js").StoreDescription<T,C_Ty>;
type T_StoreDataInput<T_Type extends StoreContentStr,T_Content extends string|number|bigint|boolean>={
	type: T_Type,description: StoreDescription<T_Content,T_Type>;
};
type StoreDataInput=
	|T_StoreDataInput<"bigint",bigint>
	|T_StoreDataInput<"boolean",boolean>
	|T_StoreDataInput<"keys",number|string>
	|T_StoreDataInput<"number",number>
	|T_StoreDataInput<"root_visual_element",number>
	|T_StoreDataInput<"string",string>
	;
;