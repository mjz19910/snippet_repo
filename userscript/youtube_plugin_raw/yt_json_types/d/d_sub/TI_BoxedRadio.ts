type TI_BoxedRadio<T_Type extends string,T_PartArr extends string[],T_IdStr extends string>={
	type: T_Type;
	tag: Join<T_PartArr,":">;
	key: `${Join<[T_Type,...T_PartArr,T_IdStr],":">}`;
	info_arr: [{raw_id: Join<[...T_PartArr,T_IdStr],"">;},{id: T_IdStr;}];
};
type TI_BoxedRadio1<T_Type extends string,T_RawId extends string>={
	type: T_Type;
	key: `${Join<[T_Type,T_RawId],":">}`;
	info_arr: [{raw_id: T_RawId;}];
};
