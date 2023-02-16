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
	1: {
		1: {
			8: T_FD32<1382109803>;
			9: T_FD32<2126714>;
			14: T_D32<115>;
		};
	};
	4: T_D32<0>;
	5: T_D32<1>;
	6: {
		1: T_D32<1676517982>;
		2: T_D32<685626069>;
	};
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
	1: {
		1: T_VSR<D_VideoId>;
	};
	3: T_D32<0>;
	5: {
		1: T_D32<1676518936>;
		2: T_D32<441847181>;
	};
};
type P_dislike_params={
	1: {
		1: T_VSR<D_VideoId>;
	};
	2: T_D32<0>;
	4: {
		1: T_D32<1676518936>;
		2: T_D32<441858121>;
	};
};
type P_subscribe_button_entity_key={
	2: T_VSR<`UC${string}`>;
	4: T_D32<51>;
	5: T_D32<1>;
};
type P_subscribe_params={
	2: {
		1: T_D32<3>;
	};
	3: T_D32<0>;
	4: T_VSR<D_VideoId>;
};
type P_unsubscribe_params={
	1: {
		1: T_D32<3>;
	};
	2: T_VSR<D_VideoId>;
	3: T_D32<0>;
};
type P_continuation_request_watch_next_token={
	2: {
		2: T_VSR<"z6EQlZaB7v8">;
	};
	3: T_D32<6>;
	6: {
		4: {
			4: T_VSR<"z6EQlZaB7v8">;
			6: T_D32<0>;
			15: T_D32<2>;
		};
		8: T_VSR<"comments-section">;
	};
};
type P_entity_key_normal={
	2: T_VSR<"RDz6EQlZaB7v8">;
	4: T_D32<354>;
	5: T_D32<1>;
};
type P_playlist_loop_state_entity_key={
	2: T_VSR<"RDz6EQlZaB7v8">;
	4: T_D32<354>;
	5: T_D32<1>;
};
type P_watch_playlist_params={
	2: T_D32<1>;
	3: T_D32<1>;
	7: T_D32<1>;
	12: T_VSR<"z6EQlZaB7v8">;
	13: T_D32<0>;
	27: {
		1: T_D32<1>;
	};
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
