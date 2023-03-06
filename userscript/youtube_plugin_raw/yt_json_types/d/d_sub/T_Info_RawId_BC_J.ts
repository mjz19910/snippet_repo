type T_Info_RawId_BC_J<T_Type extends string,T_PartArr extends string[],T_RawStr extends string>={
	b: T_Type;
	c: Join<T_PartArr,":">;
	z: [DIT_Item_A<"raw_id",DIT_Box_Typeof<T_RawStr>>];
};