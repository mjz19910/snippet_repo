type V_BinaryTimestamp={
	1: T_D32<number>;
	2: T_FD32<number>;
	3: T_FD32<number>;
};
type V_ShortTimestamp={
	1: T_D32<number>;
	2: T_D32<number>;
};
type P_ad_layout_ad_serving_data_entry={
	4: T_D32<3>;
	5?: T_D32<2>;
	6: T_D32<8>;
	7: T_D32<4>;
	9: VW_BinaryTimestamp;
	10: T_VW<{
		1: T_D32<5>;
		6: T_D32<1>;
		11: T_D32<2>;
	}>;
	13: T_D32<1>;
	14: T_D32<37>;
};

type P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry={
	1: VW_BinaryTimestamp;
	3: T_VW<{
		1: T_D32<5>;
		6: T_D32<1>;
		11: T_D32<2>;
	}>;
	4: T_D32<2>;
};
type P_create_playlist_params={1: T_D32<4>;};
type PD_continuation_request_browse_token={
	2: TV_Str<"FEwhat_to_watch">;
	3: TV_Str<string>;
	35?: TV_Str<"browse-feedFEwhat_to_watch">;
};
type PR_continuation_request_browse_token={0x4c82a9c: T_VW<PD_continuation_request_browse_token>;};
type P_reel_player_params={
	30: T_D32<1>;
	57?: T_D32<19>;
	71?: T_D32<15>;
	72?: T_VW_Bigint<13339783998227650491n>;
};
type P_reel_params={
	1: T_D32<15>;
};
type P_logging_context_serialized_context_data={
	1: {
		1: T_D32<12>;
	};
};
type P_like_params={
	1: T_VW<{
		1: T_VW<{
			8: T_FD32<1382109803>;
			9: T_FD32<2126714>;
			14: T_D32<115>;
		}>|TV_Str<D_VideoId>;
	}>;
	4: T_D32<0>;
	5?: T_D32<1>;
	6: T_VW<V_ShortTimestamp>;
	7?: T_D32<1>;
};
type P_playability_status_context_params={
	1: T_D32<1>;
	2: {
		1: T_D32<2>;
	};
};
type P_entity_key={
	2: {
		1: TV_Str<D_VideoId>;
	};
	4: T_D32<246>;
	5: T_D32<1>;
};
type P_remove_like_params={
	1: T_VW<{1: TV_Str<D_VideoId>;}>;
	3: T_D32<0>;
	4?: T_D32<1>;
	5: T_VW<V_ShortTimestamp>;
	6?: T_D32<1>;
};
type P_dislike_params_f1={
	1: TV_Str<D_VideoId>|T_VW<{}>;
};
type P_dislike_params={
	1: T_VW<P_dislike_params_f1>;
	2: T_D32<0>;
	4: T_VW<V_ShortTimestamp>;
};
type P_subscribe_button_entity_key={
	2: TV_Str<`UC${string}`>;
	4: T_D32<51>;
	5: T_D32<1>;
};
type P_subscribe_params={
	2: T_VW<{
		1: T_D32<3>;
	}>;
	3: T_D32<0>;
	4: TV_Str<D_VideoId>;
};
type P_unsubscribe_params={
	1: T_VW<{
		1: T_D32<3>;
	}>;
	2: TV_Str<D_VideoId>;
	3: T_D32<0>;
};
type P_continuation_request_watch_next_token={
	1?: {_tag: "not_done";};
	2: T_VW<{
		2: TV_Str<D_VideoId>;
	}>;
	3: T_D32<6>;
	5?: {_tag: "not_done";};
	6?: T_VW<{
		4: T_VW<{
			4: TV_Str<D_VideoId>;
			6: T_D32<0>;
			15: T_D32<2>;
		}>;
		8: TV_Str<"comments-section">;
	}>;
	9?: {_tag: "not_done";};
	13?: {_tag: "not_done";};
	14?: {_tag: "not_done";};
};
type P_entity_key_normal={
	2: TV_Str<`RD${string}`>;
	4: T_D32<354>;
	5: T_D32<1>;
};
type P_playlist_loop_state_entity_key={
	2: TV_Str<`RD${string}`>;
	4: T_D32<354>;
	5: T_D32<1>;
};
type P_watch_playlist_params={
	2: T_D32<1>;
	3: T_D32<1>;
	7: T_D32<1>;
	12: TV_Str<"z6EQlZaB7v8">;
	13: T_D32<0>;
	27?: T_VW<{
		1: T_D32<1>;
	}>;
};
type P_load_markers_entity_key={
	2: TV_Str<"HEATSEEKER">;
	4: T_D32<274>;
	5: T_D32<1>;
};
type P_create_backstage_post_params={
	1: TV_Str<`UC${string}`>;
	2: T_D32<1>;
};
type PG_subscription_state_key=P_subscription_state_key;
type P_subscription_state_key={
	2: TV_Str<`UC${string}`>;
	4: T_D32<51>;
	5: T_D32<1>;
};
type P_shorts_source_bp={
	94: {
		1: {
			2: {
				1: TV_Str<string>;
				2: TV_Str<string>;
				3: TV_Str<string>;
			};
		};
		5: T_VW_Bigint<1879003204532078215n>;
	};
};
type P_get_transcript_params={
	1: TV_Str<string>;
	2: TV_Str<string>;
	3: T_D32<1>;
	5: TV_Str<"engagement-panel-searchable-transcript-search-panel">;
	6: T_D32<1>;
	7: T_D32<1>;
	8: T_D32<1>;
};
type P_transcript_track_selection_entity_key={
	2: TV_Str<".transcript.track.selection.key">;
	4: T_D32<315>;
	5: T_D32<1>;
};
type P_transcript_track_selection_serialized_params={
	1: TV_Str<string>;
	2: TV_Str<string>;
	3: T_D32<1>;
	6: T_D32<0>;
	7: T_D32<1>;
	8: T_D32<0>;
};
type T_VW_Child<T,_tag=never>=T;
type T_VW_BinTs<T,_tag=never>=T;
type P_continuation_request_reel_watch_sequence_token={
	1?: TV_Str<"3y9Wm0IfGGs">;
	3: T_VW<{
		1: TV_Str<"BzYDxLH-tdw">,
		3: T_D32<9>,
		4: T_D32<2>,
		6: T_VW_Bigint<3301578248956209656n>;
	}>;
	5: T_VW<{
		3: T_D32<12>;
	}>;
	8?: T_VW<{}>;
	12?: TV_Str<"RDSH">;
	15: T_VW<{
		1: T_D32<10>,
		3: T_D32<9>,
		6: T_VW<{
			1: TV_Str<"Xjj5aTpUDW4">,
			2: T_VW<{6: T_D32<26>;}>,
			3: T_PArr_1<[{
				1: T_D32<1667425221>,
				2: T_D32<148262000>;
			}]>,
			4: T_PArr_1<[{1: T_D32<1669909742>;}]>,
			5: T_PArr_1<[{
				1: T_D32<13>,2: T_D32<2>;
			}]>,
			6: T_PArr_1<[{
				1: T_PArr_R<[{
					1: T_D32<100>,
					2: T_D32<1>;
				},{
					1: T_D32<152>,
					2: T_D32<1>;
				},{
					1: T_D32<220>,
					2: T_D32<1>;
				},{
					1: T_D32<400>,
					2: T_D32<1>;
				},{
					1: T_D32<902>,
					2: T_D32<1>;
				},{
					1: T_D32<960>,
					2: T_D32<1>;
				},{
					1: T_D32<965>,
					2: T_D32<1>;
				},{
					1: T_D32<966>,
					2: T_D32<1>;
				},{
					1: T_D32<967>,
					2: T_D32<1>;
				},{
					1: T_D32<968>,
					2: T_D32<1>;
				},{
					1: T_D32<969>,
					2: T_D32<1>;
				},{
					1: T_D32<970>,
					2: T_D32<1>;
				}]>;
			}]>,
			7: T_PArr_1<[{
				1: T_PArr_R<[
					{1: T_D32<887>;},
					{1: T_D32<563>;},
				]>;
			}]>,
			8: T_PArr_1<[{
				1: T_PArr_1<[{1: T_D32<203>;}]>,
				2: T_D32<2>;
			}]>,
			9: T_PArr_1<[{
				1: T_PArr_1<[{1: T_D32<205>;}]>,
				2: T_D32<2>;
			}]>,
			10: T_PArr_1<[{
				1: T_PArr_1<[{1: T_D32<203>;}]>,
				2: T_D32<2>;
			}]>,
			11: T_PArr_1<[{
				2: T_PArr_1<[{
					1: T_D32<1>,2: T_D32<1>;
				}]>;
			}]>;
		}>;
	}>;
};
type P_reel_sequence_params={
	1: TV_Str<string>;
	5: {
		3: T_D32<12>;
	};
};
type P_get_pdg_buy_flow_params={
	1: {
		1: TV_Str<string>;
		2: TV_Str<`UC${string}`>;
		3: T_D32<1>;
	};
};
type PD_continuation_params={
	3: {
		4: T_FD32<20988979>;
		8: T_FD32<1162761290>;
		9: T_FD64<4914312580592780609n>;
		10: T_FD32<1415786570>;
		12: T_FD64<5938077997913429358n>;
		13: T_FD32<1481922630>;
		14: T_FD32<2000180812>;
	};
	8: T_D32<1>;
	11: {
		2: T_D32<1030000>;
	};
	14: {
		1: T_D32<4>;
		3: T_D32<2>;
		4: T_D32<0>;
	};
	15: T_D32<1>;
};

type PR_continuation_params={
	0x94d81d4: PD_continuation_params;
};
type P_create_comment_params={
	2: TV_Str<"mUK-j5bKk0Q">;
	5: {
		1: T_D32<0>;
	};
	10: T_D32<7>;
};
type P_aadc_guidelines_state_entity_key={
	2: TV_Str<"183848276973">;
	4: T_D32<281>;
	5: T_D32<1>;
};
type P_trending_bp={
	77: TV_Str<"FEexplore">;
};

type P_ypc_get_offers_params={
	1: T_VW<{
		1: T_D32<3>;
		2: TV_Str<`UC${string}`>;
	}>;
	3: T_D32<3>;
	5: T_VW<{
		1: TV_Str<"32KKwgF67Ho">;
		3: T_D32<1>;
		5: T_VW<{
			1: TV_Str<"32KKwgF67Ho">;
		}>;
		9: T_D32<2>;
	}>;
};
type P_macro_marker_repeat_state_entity_key={
	2: TV_Str<"repeat_state">;
	4: T_D32<329>;
	5: T_D32<1>;
};
type P_player_state_entity_key={
	2: TV_Str<"/youtube/app/watch/player_state">;
	4: T_D32<323>;
	5: T_D32<1>;
};
type P_notification_record_interactions={
	2: T_VW<{
		1: T_D32<2>;
		14: T_VW<{
			1: T_VW<{
				1: T_D32<1676825106923816>;
				2: T_D32<6>;
			}>;
			2: TV_Str<"sZ-4VzlYyLcGMIys">;
		}>;
	}>;
	5: T_D32<183848276973>;
};
type P_get_report_form_params={
	25: TV_Str<"shopping">;
	26: T_D32<14>;
};
type P_notification_opt_out={
	2: T_D32<1>;
	3: TV_Str<"-qS20kHjg9QLg2bMA89bVA">;
	4: T_D32<19>;
	7: TV_Str<"dSHPtnZr2BdhZ8ss">;
};
type P_get_notification_menu_ctoken={1: T_D32<1676646338997768>;};
