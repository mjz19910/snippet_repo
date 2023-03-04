type T_UrlInfoPartial<T_Type extends string,T_PartArr extends string[],T_RawStr extends string>=
	T_PartArr extends [infer F]? {
		type: T_Type;
		tag_1: F;
		union: true;
		info_arr: [{raw_id: T_RawStr;}];
	}:T_PartArr extends [infer F,infer R1]? {
		type: T_Type;
		tag_1: F;
		tag_2: R1;
		union: true;
		info_arr: [{raw_id: T_RawStr;}];
	}:{
		type: T_Type;
		tag: Join<T_PartArr,":">;
		union: true;
		info_arr: [{raw_id: T_RawStr;}];
	};
