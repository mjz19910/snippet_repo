type D_TrackingObj_f16={
	1: T_D32<41>;
	2: T_D32<6075>;
	3: T_D32<0>;
	4: VW_BinaryTimestamp;
};
type D_TrackingObj_f19={
	1: T_D32<16>;
	2: T_D32<3832>;
};
type D_TrackingObj_f6={5: T_FD32<0>;};
type T_Base64Str=string;
type P_RT_TK_f1=T_D32<0>;

type P_RT_TK_f2=T_D32<13188>;

type H_TrackingObj_f6=TV_Str<"external"|"list_other"|"related"|"related-auto"|"watch">|T_PArr<["child",Uint8Array,D_TrackingObj_f6]>;

type VW_BinaryTimestamp=T_VW_2<V_BinaryTimestamp>;

type P_RT_TK_f3=T_D32<0>;

type G_PR_TrackingObj={
	1?: P_RT_TK_f1;
	2?: P_RT_TK_f2;
	3?: P_RT_TK_f3;
	4: VW_BinaryTimestamp;
	6?: H_TrackingObj_f6;
	7?: TV_Str<T_Base64Str>;
	8?: T_VW_Bigint<101551873087600536n>;
	9?: T_VW_Bigint<bigint>;
	11?: TV_Str<"FEwhat_to_watch">;
	16?: T_VW_2<D_TrackingObj_f16>;
	19?: T_VW_2<D_TrackingObj_f19>;
};