type V_BinaryTimestamp={
	1: T_VW_3<"data32",number>;
	2: T_VW_3<"data_fixed32",number>;
	3: T_VW_3<"data_fixed32",number>;
};

type R_ClickTrackingObj=
	|R_ClickTrackingObj_t1
	|R_ClickTrackingObj_w46
	|R_ClickTrackingObj_wx4
	;
;
type T_D32<T>=["data32",T];
type T_Fx_D32<T>=["data_fixed32",T];
type P_tracking_params={
	1: T_VW_3<"data32",0>;
	2: T_VW_3<"data32",13188>;
	4: T_VW_2<V_BinaryTimestamp>;
}|{
	1: T_VW_3<"data32",523>;
	2: T_VW_3<"data32",62457>;
	3: T_VW_3<"data32",1>;
	4: T_VW_2<V_BinaryTimestamp>;
};
type P_ad_layout_ad_serving_data_entry={
	4: T_VW_3<"data32",3>;
	5: T_VW_3<"data32",2>;
	6: T_VW_3<"data32",8>;
	7: T_VW_3<"data32",4>;
	9: T_VW_2<V_BinaryTimestamp>;
	10: {
		1: T_VW_3<"data32",5>;
		6: T_VW_3<"data32",1>;
		11: T_VW_3<"data32",2>;
	},
	13: T_VW_3<"data32",1>;
	14: T_VW_3<"data32",37>;
};

type P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry={
	1: T_VW_2<V_BinaryTimestamp>;
	3: {
		1: T_VW_3<"data32",5>;
		6: T_VW_3<"data32",1>;
		11: T_VW_3<"data32",2>;
	},
	4: T_VW_3<"data32",2>;
};
