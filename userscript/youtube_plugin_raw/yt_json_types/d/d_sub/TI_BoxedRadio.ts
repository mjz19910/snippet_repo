type TI_BoxedRadio<T_Type extends string,T_PartArr extends string[],T_IdStr extends string>={
	type: T_Type;
	type_parts: [T_Type,...T_PartArr];
	key: `${Join<[T_Type,...T_PartArr,T_IdStr],":">}`;
	info_arr: [{raw_id: Join<[...T_PartArr,T_IdStr],"">;},{arr: T_PartArr;},{id: T_IdStr;}];
};
