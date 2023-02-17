type RB_Obj_f19_w1={
	1: T_D32<16>;
	2: T_D32<3832>;
};

type RB_Obj_f19_w3={
	2: T_D32<3854>;
	3: T_D32<158>;
};

type RB_Obj_f19=RB_Obj_f19_w1|RB_Obj_f19_w3;
type RB_ClickTrackingObj_w_all={
	1: T_D32<0>;
	2: T_D32<13188>;
	4: T_VW_2<V_BinaryTimestamp>;
};
type R_ClickTrackingObj_t3={
	1: T_D32<242>;
	2: T_D32<119920>;
	3: T_D32<0>;
	4: T_VW_2<V_BinaryTimestamp>;
};
type R_ClickTrackingObj_t6={
	1: T_D32<411>;
	2: T_D32<5531>;
	4: T_VW_2<V_BinaryTimestamp>;
	6: T_VSR<"watch">;
};
type R_ClickTrackingObj_t9={
	1: T_D32<370>;
	2: T_D32<21965>;
	3: T_D32<1>;
	4: T_VW_2<V_BinaryTimestamp>;
	9: T_VW_Bigint<bigint>;
};
type RB_ClickTrackingObj_t3={
	1: T_D32<416>;
	2: T_D32<76764>;
	3: T_D32<26>;
	4: T_VW_2<V_BinaryTimestamp>;
};
type RB_ClickTrackingObj_t19={
	1: T_D32<416>;
	2: T_D32<6236>;
	4: T_VW_2<V_BinaryTimestamp>;
	6: T_VW_2<{5: T_FD32<number>;}>;
	11: T_VSR<"FEwhat_to_watch">;
	19: T_VW_2<{
		2: T_D32<3854>;
		3: T_D32<158>;
	}>;
};
type RB_ClickTrackingObj_t1=RB_ClickTrackingObj_w_all|RB_ClickTrackingObj_t3|RB_ClickTrackingObj_t19|R_ClickTrackingObj_t3|R_ClickTracking_v238|R_ClickTrackingObj_t6|R_ClickTrackingObj_t9|R_ClickTrackingObj_t1_u1_v0_u2_v13187;
