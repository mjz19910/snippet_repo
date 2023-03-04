type T_UrlInfo_Join<T_Type extends string,T_PartArr extends string[],T_IdStr extends string>={
	type: T_Type;
	type_parts: T_PartArr extends [infer F,...infer R]? R extends []? {r: T_Type,a: F;}:{r: T_Type,a: F; b: R;}:{r: T_Type,a: T_PartArr;};
	info_arr: [{raw_id: Join<[...T_PartArr,T_IdStr],"">;},{arr: T_PartArr;},{id: T_IdStr;}];
};
