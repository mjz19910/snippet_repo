type T_Info_RawId_BC_J<T_Type extends string,T_PartArr extends string[],T_RawStr extends string>={
	a: "R";
	// ^ a = is
	b: T_Type;
	// ^ b = type
	c: Join<T_PartArr,":">;
	z: [DIT_Item_AB<"raw_id",DIT_Box_Typeof<T_RawStr>>];
};