type V_BinaryTimestamp={
	1: T_D32<number>;
	2: T_FD32<number>;
	3: T_FD32<number>;
};
type R_ClickTrackingObj=
	|R_ClickTrackingObj_t1
	|R_ClickTrackingObj_w46
	|R_ClickTrackingObj_wx4
	;
;
type P_tracking_params={
	1: T_D32<0>;
	2: T_D32<13188>;
	4: T_VW_2<V_BinaryTimestamp>;
}|{
	1: T_D32<523>;
	2: T_D32<62457>;
	3: T_D32<1>;
	4: T_VW_2<V_BinaryTimestamp>;
}|{
	1: T_D32<512>;
	2: T_D32<62457>;
	3: T_D32<2>;
	4: T_VW_2<V_BinaryTimestamp>;
}|{
	1: T_D32<521>;
	2: T_D32<6236>;
	4: T_VW_2<V_BinaryTimestamp>;
	8: T_VW_Bigint<12391810279397228368n>;
}|{
	1: T_D32<395>;
	2: T_D32<6236>;
	4: T_VW_2<V_BinaryTimestamp>;
	8: T_VW_Bigint<12391810279397228368n>;
}|{
	1: T_D32<340>;
	2: T_D32<7099>;
	4: T_VW_2<V_BinaryTimestamp>;
};
type P_ad_layout_ad_serving_data_entry={
	4: T_D32<3>;
	5: T_D32<2>;
	6: T_D32<8>;
	7: T_D32<4>;
	9: T_VW_2<V_BinaryTimestamp>;
	10: {
		1: T_D32<5>;
		6: T_D32<1>;
		11: T_D32<2>;
	};
	13: T_D32<1>;
	14: T_D32<37>;
};

type P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry={
	1: T_VW_2<V_BinaryTimestamp>;
	3: {
		1: T_D32<5>;
		6: T_D32<1>;
		11: T_D32<2>;
	};
	4: T_D32<2>;
};
type P_create_playlist_params={1: T_D32<4>;};
type P_continuation_request_browse_token={
	0x4c82a9c: {
		2: T_VSR<"FEwhat_to_watch">;
		3: T_VSR<string>;
		35: T_VSR<"browse-feedFEwhat_to_watch">;
	};
};
type P_reel_player_params={
	30: T_D32<1>,
	71: T_D32<15>
};
type P_reel_params={
	1: T_D32<15>
};
type P_logging_context_serialized_context_data={
	1: {
		1: T_D32<12>
	}
};
