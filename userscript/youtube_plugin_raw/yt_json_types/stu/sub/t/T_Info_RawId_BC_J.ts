type T_Info_RawId_BC_J<T_Type extends string,T_PartArr extends string[],T_RawStr extends string>={
	a: "R";
	// ^ a = is
	b: T_Type;
	// ^ b = type
	c: Join<T_PartArr,":">;
	z: [T_DI_FromObj<{raw_id: T_RawStr}>];
};