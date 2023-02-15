type R_TrackingObj={
	1: T_VW<number>;
	2: T_VW<number>;
	4: T_VW<V_BinaryTimestamp>;
}|{
	1: T_VW<number>;
	2: T_VW<number>;
	3: T_VW<0>;
	4: T_VW<V_BinaryTimestamp>;
}|{
	1: T_VW<number>;
	2: T_VW<number>;
	3: T_VW<0>;
	4: T_VW<V_BinaryTimestamp>;
	8: VW_Bigint<bigint>;
}|{
	1: T_VW<number>;
	2: T_VW<number>;
	4: T_VW<V_BinaryTimestamp>;
	6: T_VW<"watch">;
};
