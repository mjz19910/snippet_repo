type D_TrackingObj_f16={
	1: T_D32<41>;
	2: T_D32<6075>;
	3: T_D32<0>;
	4: T_VW_2<V_BinaryTimestamp>;
};
type D_TrackingObj_f19={
	1: T_D32<16>;
	2: T_D32<3832>;
};
type D_TrackingObj_f6={5: T_FD32<0>;};
type T_Base64Str=string;
type G_PR_TrackingObj={
	1?: T_D32<0>;
	2?: T_D32<13188>;
	3?: T_D32<0>;
	4: T_VW_2<V_BinaryTimestamp>;
	6?: T_VSR<"external"|"list_other"|"related"|"related-auto"|"watch">|T_PArr<["child",Uint8Array,D_TrackingObj_f6]>;
	7?: T_VSR<T_Base64Str>;
	8?: T_VW_Bigint<101551873087600536n>;
	9?: T_VW_Bigint<bigint>;
	11?: T_VSR<"FEwhat_to_watch">;
	16?: T_VW_2<D_TrackingObj_f16>;
	19?: T_VW_2<D_TrackingObj_f19>;
};
