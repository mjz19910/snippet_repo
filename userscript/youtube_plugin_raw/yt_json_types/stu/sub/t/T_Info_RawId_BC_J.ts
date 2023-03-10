type T_Info_RawId_BC_J<T_Type extends string,T_PartArr extends string[],T_RawStr extends string>={
	a: "R";
	k: T_Type;
	// ^ k = type
	l: Join<T_PartArr,":">;
	// ^ l = tag
	z: [T_DI_RawIdBox<T_RawStr>];
};
