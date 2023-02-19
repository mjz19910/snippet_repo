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
	5: T_D32<2>;
	6: T_D32<8>;
	7: T_D32<4>;
	9: T_VW_2<V_BinaryTimestamp>;
	10: T_VW_2<{
		1: T_D32<5>;
		6: T_D32<1>;
		11: T_D32<2>;
	}>;
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
type PD_continuation_request_browse_token={
	2: T_VSR<"FEwhat_to_watch">;
	3: T_VSR<string>;
	35: T_VSR<"browse-feedFEwhat_to_watch">;
};

type PR_continuation_request_browse_token={
	0x4c82a9c: PD_continuation_request_browse_token;
};
type P_reel_player_params={
	30: T_D32<1>;
	71: T_D32<15>;
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
	1: T_VW_2<{
		1: T_VW_2<{
			8: T_FD32<1382109803>;
			9: T_FD32<2126714>;
			14: T_D32<115>;
		}>|T_VSR<D_VideoId>;
	}>;
	4: T_D32<0>;
	5: T_D32<1>;
	6: T_VW_2<V_ShortTimestamp>;
	7: T_D32<1>;
};
type P_playability_status_context_params={
	1: T_D32<1>;
	2: {
		1: T_D32<2>;
	};
};
type P_entity_key={
	2: {
		1: T_VSR<D_VideoId>;
	};
	4: T_D32<246>;
	5: T_D32<1>;
};
type P_remove_like_params={
	1: T_VW_2<{1: T_VSR<D_VideoId>;}>;
	3: T_D32<0>;
	5: T_VW_2<V_ShortTimestamp>;
};
type P_dislike_params={
	1: T_VW_2<{1: T_VSR<D_VideoId>;}|{
		1: T_VW_2<{
			10: T_D32<70>;
			14: [
				"data_fixed64",
				V_Bigint<5290090427792780129n>
			];
		}>;
	}>;
	2: T_D32<0>;
	4: T_VW_2<V_ShortTimestamp>;
};
type P_subscribe_button_entity_key={
	2: T_VSR<`UC${string}`>;
	4: T_D32<51>;
	5: T_D32<1>;
};
type P_subscribe_params={
	2: T_VW_2<{
		1: T_D32<3>;
	}>;
	3: T_D32<0>;
	4: T_VSR<D_VideoId>;
};
type P_unsubscribe_params={
	1: T_VW_2<{
		1: T_D32<3>;
	}>;
	2: T_VSR<D_VideoId>;
	3: T_D32<0>;
};
type P_continuation_request_watch_next_token={
	2: T_VW_2<{
		2: T_VSR<D_VideoId>;
	}>;
	3: T_D32<6>;
	6: T_VW_2<{
		4: T_VW_2<{
			4: T_VSR<D_VideoId>;
			6: T_D32<0>;
			15: T_D32<2>;
		}>;
		8: T_VSR<"comments-section">;
	}>;
}|{
	2: T_VW_2<{
		2: T_VSR<D_VideoId>;
		4: T_VSR<`RD${string}`>;
		6: T_VW_2<{}>;
		7: T_D32<29>;
		25: T_D32<0>;
		28: T_D32<3>;
		36: T_VW_2<{
			5: T_VW_Bigint<18446744073709551615n>;
			8: T_D32<0>;
		}>;
	}>;
	3: T_D32<11>;
	9: T_VW_2<{
		1: T_VW_2<{
			2: T_VSR<`PL${string}`>;
			3: T_D32<25>;
		}>;
		3: T_D32<0>;
	}>;
	13: T_VW_2<{
		5: T_FD32<1684366694>;
		12: T_FD64<8392569429487543156n>;
	}>;
	14: T_VW_2<{
		1: T_D32<0>;
	}>;
};
type P_entity_key_normal={
	2: T_VSR<`RD${string}`>;
	4: T_D32<354>;
	5: T_D32<1>;
};
type P_playlist_loop_state_entity_key={
	2: T_VSR<`RD${string}`>;
	4: T_D32<354>;
	5: T_D32<1>;
};
type P_watch_playlist_params={
	2: T_D32<1>;
	3: T_D32<1>;
	7: T_D32<1>;
	12: T_VSR<"z6EQlZaB7v8">;
	13: T_D32<0>;
	27: T_VW_2<{
		1: T_D32<1>;
	}>;
};
type P_load_markers_entity_key={
	2: T_VSR<"HEATSEEKER">;
	4: T_D32<274>;
	5: T_D32<1>;
};
type P_create_backstage_post_params={
	1: T_VSR<`UC${string}`>;
	2: T_D32<1>;
};
type P_subscription_state_key={
	2: T_VSR<`UC${string}`>;
	4: T_D32<51>;
	5: T_D32<1>;
};
type P_shorts_source_bp={
	94: {
		1: {
			2: {
				1: T_VSR<string>;
				2: T_VSR<string>;
				3: T_VSR<string>;
			};
		};
		5: T_VW_Bigint<1879003204532078215n>;
	};
};
type P_get_transcript_params={
	1: T_VSR<string>;
	2: T_VSR<string>;
	3: T_D32<1>;
	5: T_VSR<"engagement-panel-searchable-transcript-search-panel">;
	6: T_D32<1>;
	7: T_D32<1>;
	8: T_D32<1>;
};
type P_transcript_track_selection_entity_key={
	2: T_VSR<".transcript.track.selection.key">;
	4: T_D32<315>;
	5: T_D32<1>;
};
type P_transcript_track_selection_serialized_params={
	1: T_VSR<string>;
	2: T_VSR<string>;
	3: T_D32<1>;
	6: T_D32<0>;
	7: T_D32<1>;
	8: T_D32<0>;
};
type P_continuation_request_reel_watch_sequence_token={
	3: {
		1: T_VSR<string>;
		3: T_D32<10>;
		4: T_D32<2>;
		6: T_VW_Bigint<3749702744313588453n>;
	};
	5: {
		3: T_D32<15>;
	};
	8: {};
	12: T_VSR<"RDSH">;
	15: {
		1: T_D32<11>;
		3: T_D32<11>;
		6: {
			1: T_VSR<string>;
			2: {
				6: T_D32<26>;
			};
			3: {
				1: T_D32<1668653213>;
				2: T_D32<485233000>;
			};
			4: {
				1: T_D32<1669690989>;
			};
			5: {
				1: T_D32<13>;
				2: T_D32<2>;
			};
			6: {
				1: {
					1: T_D32<970>;
					2: T_D32<1>;
				};
			};
			7: {
				1: {
					1: T_D32<1288>;
				};
			};
			8: {
				1: {
					1: T_D32<204>;
				};
				2: T_D32<2>;
			};
			9: {
				1: {
					1: T_D32<205>;
				};
				2: T_D32<2>;
			};
			10: {
				1: {
					1: T_D32<204>;
				};
				2: T_D32<2>;
			};
			11: {
				2: {
					1: T_D32<1>;
				};
			};
		};
	};
};
type P_reel_sequence_params={
	1: T_VSR<string>;
	5: {
		3: T_D32<12>;
	};
};
type P_get_pdg_buy_flow_params={
	1: {
		1: T_VSR<string>;
		2: T_VSR<`UC${string}`>;
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
	2: T_VSR<"mUK-j5bKk0Q">;
	5: {
		1: T_D32<0>;
	};
	10: T_D32<7>;
};
type P_aadc_guidelines_state_entity_key={
	2: T_VSR<"183848276973">;
	4: T_D32<281>;
	5: T_D32<1>;
};
type P_trending_bp={
	77: T_VSR<"FEexplore">;
};
