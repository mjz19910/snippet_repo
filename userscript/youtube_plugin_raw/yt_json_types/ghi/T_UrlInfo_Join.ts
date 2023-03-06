type T_UrlInfo_Join<T_Type extends string,T_PartArr extends string[],T_IdStr extends string>=
	T_PartArr extends [infer F]? {
		type: T_Type;
		tag: F;
		z: [DIT_Item_AB<"raw_id",DIT_Box_Typeof<Join<[...T_PartArr,T_IdStr],"">;},{id: T_IdStr>>];
	}:{
		type: T_Type;
		tag: Join<T_PartArr,":">;
		z: [DIT_Item<"raw_id",DIT_Prim<Join<[...T_PartArr,T_IdStr],"">;},{id: T_IdStr>>];
	}
	;
;
