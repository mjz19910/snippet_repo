type RB_ClickTrackingObj_w4w6={
	4: T_VW_2<V_BinaryTimestamp>;
	6: T_VW_R<"string","external">;
};
type RB_ClickTrackingObj_w1w2w4={
	1: T_D32<0>;
	2: T_D32<13188>;
	4: T_VW_2<V_BinaryTimestamp>;
};
type RB_ClickTrackingObj_w3={
	1: T_D32<416>;
	2: T_D32<76764>;
	3: T_D32<26>;
	4: T_VW_2<V_BinaryTimestamp>;
};
type RB_ClickTrackingObj_w1w4={
	1: T_D32<411>;
	2: T_D32<5531>;
	4: T_VW_2<V_BinaryTimestamp>;
	6: T_VSR<"watch">;
};
type RB_ClickTrackingObj_w9={
	1: T_D32<370>;
	2: T_D32<21965>;
	3: T_D32<1>;
	4: T_VW_2<V_BinaryTimestamp>;
	9: T_VW_Bigint<bigint>;
};
type RB_ClickTrackingObj_w19w11={
	1: T_D32<416>;
	2: T_D32<6236>;
	4: T_VW_2<V_BinaryTimestamp>;
	6: T_VW_2<{
		5: T_FD32<number>;
	}>;
	11: T_VSR<"FEwhat_to_watch">;
	19: T_VW_2<{
		2: T_D32<3854>;
		3: T_D32<158>;
	}>;
};
type RB_ClickTrackingObj_w19={
	1: T_D32<0>,
	2: T_D32<13187>,
	4: T_VW_2<V_BinaryTimestamp>,
	6: T_VSR<"related-auto">,
	9: T_VW_Bigint<2846068225792461286n>,
	19: {
		1: T_D32<3>,
		2: T_D32<3832>
	}
};
type RB_ClickTrackingObj=
	|RB_ClickTrackingObj_w1w2w4
	|RB_ClickTrackingObj_w4
	|RB_ClickTrackingObj_w3
	|RB_ClickTrackingObj_w1w4
	|RB_ClickTrackingObj_w4w6
	|RB_ClickTrackingObj_w9
	|RB_ClickTrackingObj_w19w11
	|RB_ClickTrackingObj_w19
	;
;