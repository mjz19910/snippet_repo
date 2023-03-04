type P_entity_key={
	2: T_VW<{1: TV_Str<D_VideoIdStr>;}>;
	4: T_D32<246>;
	5: T_D32<1>;
}|{
	2: TV_Str<`RD${string}`>;
	4: T_D32<354>;
	5: T_D32<1>;
}|{
	2: TV_Str<"topbar">;
	4: T_D32<245>;
	5: T_D32<1>;
}|{
	2: TV_Str<D_VideoIdStr>;
	4: T_D32<341>;
	5: T_D32<1>;
};
type P_subscribe_button_entity_key={
	2: TV_Str<`UC${string}`>;
	4: T_D32<51>;
	5: T_D32<1>;
};
type P_load_markers_entity_key={
	2: TV_Str<"HEATSEEKER"|"AUTO_CHAPTERS"|"DESCRIPTION_CHAPTERS">;
	4: T_D32<274>;
	5: T_D32<1>;
};
type P_playlist_loop_state_entity_key={
	2: TV_Str<`RD${string}`>;
	4: T_D32<354>;
	5: T_D32<1>;
};
type P_transcript_track_selection_entity_key={
	2: TV_Str<".transcript.track.selection.key">;
	4: T_D32<315>;
	5: T_D32<1>;
};
type P_aadc_guidelines_state_entity_key={
	2: TV_Str<"183848276973">;
	4: T_D32<281>;
	5: T_D32<1>;
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
type P_macro_markers_list_entity_key={
	2: TV_Str<"KEY_MOMENTS">;
	4: T_D32<274>;
	5: T_D32<1>;
};
type P_view_count_entity_key={
	2: TV_Str<D_VideoIdStr>;
	4: T_D32<194>;
	5: T_D32<1>;
};
type P_change_markers_visibility_entity_key={
	2: TV_Str<"KEY_MOMENTS">;
	4: T_D32<274>;
	5: T_D32<1>;
};
type P_EntityKey=
	|P_aadc_guidelines_state_entity_key
	|P_change_markers_visibility_entity_key
	|P_entity_key
	|P_load_markers_entity_key
	|P_macro_marker_repeat_state_entity_key
	|P_macro_markers_list_entity_key
	|P_player_state_entity_key
	|P_playlist_loop_state_entity_key
	|P_subscribe_button_entity_key
	|P_transcript_track_selection_entity_key
	|P_view_count_entity_key
	;
;
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

type PX_ad_data_info={
	1: T_D32<5>;
	6: T_D32<1>;
	11: T_D32<2>;
};
type P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry={
	1: VW_BinaryTimestamp;
	3: T_VW<PX_ad_data_info>;
	4: T_D32<2>;
};
type P_create_playlist_params={1: T_D32<4>;};
type PD_continuation_request_browse_token={
	2: TV_Str<"FEwhat_to_watch">;
	3: TV_Str<string>;
	35?: TV_Str<"browse-feedFEwhat_to_watch"|"browse-feedFEsubscriptions">;
};
type PR_continuation_request_browse_token={0x4c82a9c: T_VW<PD_continuation_request_browse_token>;};
type P_reel_player_params={
	30: T_D32<1>;
	57?: T_D32<19>;
	71?: T_D32<15>;
	72?: T_VW_Bigint<bigint>;
};
type P_reel_params={
	1: T_D32<15>;
	3?: T_VW<V_BinaryTimestamp>;
	5?: T_VW_J<{}>;
	6?: T_D32<2>;
};
type PK_f1={1: T_D32<2|3|12>;};
type P_logging_context_serialized_context_data={
	1?: T_VW<{1: T_D32<12>;}>;
	3?: TV_Str<SD_PlaylistId>;
};
type TW_Str<T extends string>=TV_Str_CS<T>|TW_TagStr<T>|TV_Str<T>;
type P_like_params={
	1: T_VW<{1: TW_Str<D_VideoIdStr>;}>;
	4: T_D32<0>;
	5?: T_D32<1>;
	6: T_VW<V_ShortTimestamp>;
	7?: T_D32<1>;
};
type P_playability_status_context_params={
	1: T_D32<1>;
	2: T_VW<{1: T_D32<2>;}>;
};
type P_remove_like_params={
	1: T_VW<{1: TV_Str<D_VideoIdStr>|TW_TagStr<D_VideoIdStr>;}>;
	3: T_D32<0>;
	4?: T_D32<1>;
	5: T_VW<V_ShortTimestamp>;
	6?: T_D32<1>;
};
type P_dislike_params_f1={
	1: TV_Str<D_VideoIdStr>|T_VW<{}>|TV_Str_CS<D_VideoIdStr>;
};
type P_dislike_params={
	1: T_VW<P_dislike_params_f1>;
	2: T_D32<0>;
	3?: T_D32<1>;
	4: T_VW<V_ShortTimestamp>;
	5?: T_D32<1>;
};
type P_subscribe_params={
	2: T_VW<{
		1: T_D32<3>;
	}>;
	3: T_D32<0>;
	4: TV_Str<D_VideoIdStr>;
};
type P_unsubscribe_params={
	1: T_VW<{
		1: T_D32<3>;
	}>;
	2?: TV_Str<D_VideoIdStr>|TW_TagStr<D_VideoIdStr>;
	3: T_D32<0>;
};
type PX_watch_next_token_info={
	2: TV_Str<D_VideoIdStr>;
	4?: TV_Str<string>;
	6?: T_VW<{}>;
	7?: T_D32<18>;
	25?: T_D32<0>;
	28?: T_D32<3>;
	36?: T_VW<{
		5: T_D64<bigint>;
		8: T_D32<0>;
	}>;
};
type PX_watch_next_token_item={
	1: T_D32<number>|T_D64<bigint>;
	3?: T_D32<1>;
};
type PX_watch_next_token_3={
	1: T_VW<PX_watch_next_token_6>;
	3: T_D32<0>;
	4: TV_Str<"Watched">;
	5: T_D32<19>;
};
type PX_watch_next_token_2={
	4: TV_Str<D_VideoIdStr>;
	6: T_D32<0>;
	15: T_D32<2>;
	37?: TV_Str<string>;
};
type PX_watch_next_token_1={
	4: T_VW<PX_watch_next_token_2>;
	6?: T_D32<1>;
	8: TV_Str<"comments-section"|"engagement-panel-comments-section">;
};
type PX_watch_next_token_4={
	5: T_FD32<number>;
	12: T_FD64<bigint>;
};
type PX_watch_next_token_5={1: T_D32<0>;};
type PX_watch_next_token_6={
	1: T_VA<PX_watch_next_token_item>;
	3: T_D32<2>;
	4?: TV_Str<"/m/0jxy">;
};
type P_continuation_request_watch_next_token={
	1?: T_D32<20>;
	2: T_VW<PX_watch_next_token_info>;
	3: T_D32<0|6>;
	5?: TV_Str<string>;
	6?: T_VW<PX_watch_next_token_1>;
	9?: T_VW<PX_watch_next_token_3>;
	13?: T_VW<PX_watch_next_token_4>;
	14?: T_VW<PX_watch_next_token_5>;
};
type P_watch_playlist_params={
	2: T_D32<1>;
	3: T_D32<1>;
	7: T_D32<1>;
	12: TV_Str<D_VideoIdStr>;
	13: T_D32<0>;
	27?: T_VW<{
		1: T_D32<1>;
	}>;
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
		5: T_VW_Bigint<bigint>;
	};
};
type P_get_transcript_params={
	1: TV_Str<D_VideoIdStr>;
	2: TV_Str<string>;
	3: T_D32<1>;
	5: TV_Str<"engagement-panel-searchable-transcript-search-panel">;
	6: T_D32<1>;
	7: T_D32<1>;
	8: T_D32<1>;
};
type P_transcript_track_selection_serialized_params={
	1: TV_Str<D_VideoIdStr>;
	2: TV_Str<string>;
	3: T_D32<1>;
	6: T_D32<0>;
	7: T_D32<1>;
	8: T_D32<0>;
};
type PX_watch_sequence_info={
	1: TV_Str<D_VideoIdStr>;
	3: T_D32<9>;
	4: T_D32<2>;
	6: T_VW_Bigint<bigint>;
};
type P_reel_watch_sequence_data={
	1: T_D32<10>;
	3: T_D32<9>;
	6: T_VW<{
		1: TV_Str<string>;
		2: T_VW<{
			6: T_D32<26>;
		}>;
		3: T_VW<{
			1: T_D32<number>;
			2: T_D32<number>;
		}>;
		4: T_VW<{
			1: T_D32<number>;
		}>;
		5: T_VW<{
			1: T_D32<13>;
			2: T_D32<2>;
		}>;
		6: T_VW<{
			1: T_PArr_R<P_reel_watch_sequence_Arr1>;
		}>;
		7: T_VW<{
			1: T_PArr_R<P_reel_watch_sequence_Arr2>;
		}>;
		8: T_VW<{
			1: T_VW<{1: T_D32<203>;}>;
			2: T_D32<2>;
		}>;
		9: T_VW<{
			1: T_VW<{1: T_D32<205>;}>;
			2: T_D32<2>;
		}>;
		10: T_VW<{
			1: T_VW<{1: T_D32<203>;}>;
			2: T_D32<2>;
		}>;
		11: T_VW<{
			2: T_VW<{
				1: T_D32<1>;
				2: T_D32<1>;
			}>;
		}>;
	}>;
};
type P_continuation_request_reel_watch_sequence_token={
	1?: TV_Str<D_VideoIdStr>;
	3: T_VW<PX_watch_sequence_info>;
	5: T_VW<TX_sequence_info>;
	8?: T_VW<{}>;
	12?: TV_Str<"RDSH">;
	15: T_VW<P_reel_watch_sequence_data>;
};
type TX_sequence_info={3: T_D32<12>;};
// cspell:ignore BRaeiCMuKpQ
// https://www.youtube.com/shorts/BRaeiCMuKpQ
type P_reel_sequence_params={
	1: TV_Str<D_VideoIdStr>;
	3?: T_VW_J<{
		1: TV_Str<"BRaeiCMuKpQ">;
		3: T_D32<0>;
		4: T_D32<1>;
		6: T_D64<8255699468498757831n>;
	}>;
	5: T_VW<TX_sequence_info>;
	8?: T_VW_J<{}>;
	12?: TV_Str<"RDSH">;
};
type PX_buy_flow_params={
	1: TV_Str<D_VideoIdStr>;
	2: TV_Str<`UC${string}`>;
	3: T_D32<1>;
};
type P_get_pdg_buy_flow_params={1: T_VW<PX_buy_flow_params>;};
type PD_continuation_params_f3={
	4: T_FD32<number>;
	8: T_FD32<number>;
	9: T_FD64<bigint>;
	10: T_FD32<number>;
	12: T_FD64<bigint>;
	13: T_FD32<number>;
	14: T_FD32<number>;
};
type PD_continuation_params_f14={
	1: T_D32<4>;
	3: T_D32<2>;
	4: T_D32<0>;
};
type PD_continuation_params_f11={2: T_D32<number>;};
type PD_continuation_params={
	3: T_VW<PD_continuation_params_f3>|TV_Str<string>;
	8: T_D32<1>;
	11?: T_VW<PD_continuation_params_f11>;
	14: T_VW<PD_continuation_params_f14>;
	15?: T_D32<1>;
};
type PD_invalidation_continuation={
	3: TV_Str<string>;
	5?: T_D32<number>;
	6: T_D32<1>;
	8?: T_D32<2>;
	9?: T_VW<PD_invalidation_continuation_f9>;
	10?: T_D32<number>;
	11?: T_D32<number>;
	16: T_VW<{
		1: T_D32<4>;
		3: T_D32<1>;
	}|{
		1: T_D32<4>;
		3: T_D32<2>;
		4: T_D32<0>;
	}>;
	17: T_D32<0|1>;
	19?: T_VW<{1: T_D32<0>;}>;
	20: T_D32<number>;
	21: T_D32<0>;
	22: T_VW<{}>;
	23?: T_VW<{1: T_D32<10>;}>;
};
type PR_continuation_params=
	|{0x94d81d4: T_VW<PD_continuation_params>;}
	|{0x722607a: T_VW<PD_invalidation_continuation>;}
	|P_timed_continuation_data
	;
;
type P_create_comment_params={
	2: TV_Str<D_VideoIdStr>;
	5: T_VW<{1: T_D32<0>;}>;
	10: T_D32<7>;
};
type P_trending_bp={77: TV_Str<"FEexplore">;};
type P_ypc_get_offers_params_f1={
	1: T_D32<3>;
	2: TV_Str<`UC${string}`>;
};
type P_ypc_get_offers_params_f5_f1={1: TV_Str<D_VideoIdStr>;};
type P_ypc_get_offers_params_f5={
	1: TV_Str<D_VideoIdStr>;
	3: T_D32<1>;
	5: T_VW<P_ypc_get_offers_params_f5_f1>;
	9: T_D32<2>;
};
type P_ypc_get_offers_params={
	1: T_VW<P_ypc_get_offers_params_f1>;
	3: T_D32<3>;
	5: T_VW<P_ypc_get_offers_params_f5>;
};
type P_notification_record_interactions={
	2: T_VW<{
		1: T_D32<2>;
		14: T_VW<{
			1: T_VW<{
				1: T_D32<number>;
				2: T_D32<6>;
			}>;
			2: TV_Str<string>;
		}>;
	}>;
	5: T_D32<number>;
};
type P_get_report_form_params={
	25: TV_Str<"shopping">;
	26: T_D32<14>;
	28?: T_VW<{1: T_PArr_R<P_get_report_form_params_Arr1>;}>;
};
type P_notification_opt_out={
	2: T_D32<1>;
	3: TV_Str<string>;
	4: T_D32<19>;
	7: TV_Str<string>;
};
type P_get_notification_menu_ctoken={1: T_D32<number>;};
type P_format_item_xtags_f1={
	1: TV_Str<"heaudio">;
	2: TV_Str<`${true}`>;
};
type P_format_item_xtags={1: T_VW<P_format_item_xtags_f1>;};
type P_watch_player_params={
	8?: T_D32<1>;
	9?: T_D32<1>;
	12?: T_D32<1>;
	25?: T_D32<1>;
	40?: T_VW<{
		1: T_VW<{
			2: T_D32<2>;
			3: T_D32<1>;
		}>;
	}>;
};
type PX_watch_bin={
	2: TV_Str<string>;
	3: T_D32<number>;
	4: T_D32<number>;
	5: T_D32<248>;
};
type PD_watch_bin={
	2: T_D32<2>;
	3: T_D32<1>;
};
type PR_watch_bin={1: T_VW<PD_watch_bin>;};
type P_watch_params={
	2?: T_D32<1>;
	3?: T_D32<1>;
	7?: T_D32<2>;
	12?: TV_Str<D_VideoIdStr>;
	13?: T_D32<0>;
	15?: TV_Str<`${string}.${string}`>;
	24?: T_D32<1>;
	27?: T_VW<{1: T_D32<1>;}>;
	33?: T_VW<PX_watch_bin>;
	36?: T_VW<{24: T_D32<0>;}>;
	39?: T_D32<637>;
	40?: T_VW<PR_watch_bin>;
	56?: TV_Str<D_VideoIdStr>;
};
type P_ve_6827_params={
	77?: TV_Str<"FEexplore">;
	84?: T_VW<{
		5: T_D32<2>;
	}>;
	93?: T_VW<{
		1: TV_Str<"bigbusiness">;
		3: T_D32<1>;
	}>;
	94?: T_VW<{
		1: T_VW<{
			2: T_VW_BinTs<{
				1: TV_Str<D_VideoIdStr>;
				2: TV_Str<D_VideoIdStr>;
				3: TV_Str<D_VideoIdStr>;
			}>;
		}>;
		5: T_D64<bigint>;
	}>;
};
type P_playlist_edit_params={
	1: T_D32<1>;
};
type P_ve_3611_params_1={
	1: T_VW<P_ve_3611_params_2>;
};
type P_ve_3611_params_2={
	6: T_VW<{}>;
};
type P_ve_3611_params={
	2?: T_VW<{}>;
	23?: T_D32<0>;
	110: T_VW<P_ve_3611_params_1>;
};
type P_search_params={
	2: T_VW<PF_23n24n>;
};
type PF_23n24n={
	23: T_D32<1>;
	24: TV_Str<string>;
};
type P_bin_params_1_f1={
	1: T_FD64<bigint>;
	2: T_FD64<bigint>;
};
type P_bin_params_1={
	1: T_VW<P_bin_params_1_f1>;
};
type PX_upcoming_event_reminder_info={
	1: T_D32<0>;
	2: T_D32<0>;
};
type P_notification_add_upcoming_event_reminder_params={
	1: T_VW<PD_event_info>|TV_Str_CS<"PEcy1vYHb8A">;
	6: T_VW<PX_upcoming_event_reminder_info>;
};
type P_notification_remove_upcoming_event_reminder_params={
	1: T_VW<PD_event_info>;
	6: T_VW<PX_upcoming_event_reminder_info>;
};
type PD_event_info={14: T_FD64<bigint>;};
type PD_timed_continuation={
	3: T_VW<PD_event_info>;
	4: T_D32<number>;
	7: T_D32<1>;
	8: T_D32<1>;
};
type P_timed_continuation_data={0x6b7c87f: T_VW<PD_timed_continuation>;};
type PD_invalidation_continuation_f9={
	1: T_D32<0>;
	3: T_D32<0>;
	4: T_D32<0>;
	9: T_VW<{
		2: T_D32<0>;
		3: T_D32<0>;
		4: T_D32<0>;
	}>;
	10: T_D32<number>;
	11: T_D32<3>;
	15: T_D32<0>;
	20: T_VW<{
		1: T_VW<{
			1: T_D32<number>;
			2: T_D32<number>;
		}>;
		2: T_VW<{
			1: T_D32<number>;
			2: T_D32<number>;
		}>;
		3: T_VW<{1: T_D32<300>;}>;
		4: T_D32<0>;
	}>;
	21: T_VW<{
		2: T_D32<0>;
		3: T_VW<{1: T_D32<1>;}>;
		4: T_VW<{1: T_D32<1>;}>;
	}>;
	22: T_D32<0>;
	24: T_D32<0>;
	25: T_D32<number>;
	28: T_VW<{
		1: T_D32<number>;
		2: T_D32<number>;
	}>;
	29: T_D32<0>;
	30: T_D32<0>;
	31: T_D32<0>;
	33: T_D32<0>;
	34: T_D32<0>;
};
type P_invalidation_continuation={0x722607a: T_VW<PD_invalidation_continuation>;};
type P_perform_comment_action={
	1: T_D32<5>;
	2: T_D32<2>;
	3: TV_Str<`${string}.${string}`>;
	5: TV_Str<D_VideoIdStr>;
	6: T_D32<1>;
	7: T_D32<0>;
	9: TV_Str<`${bigint}`>;
	21: T_D32<12>;
	23: TV_Str<`UC${string}`>;
	30: T_D32<0>;
};
type P_create_reply_params={
	2: TV_Str<D_VideoIdStr>;
	4: TV_Str<string>;
	5: T_VW<{1: T_D32<0>;}>;
	10: T_D32<7>;
	14: TV_Str<`${string}.${string}`>;
	29: T_D32<0>;
};
type P_PX_watch_next_token_2_f37={
	10: TV_Str<string>;
	15: T_D32<2>;
	20: T_D32<2>;
};
type P_f3_PD_continuation_params_f1_data={
	1: TV_Str<`UC${string}`>;
	2: TV_Str<D_VideoIdStr>;
};
type P_f3_PD_continuation_params_f1={5: T_VW<P_f3_PD_continuation_params_f1_data>;};
type P_f3_PD_continuation_params_data={1: TV_Str<D_VideoIdStr>;};
type P_f3_PD_continuation_params_obj={0x2e6ea8d: T_VW<P_f3_PD_continuation_params_data>;};
type P_f3_PD_continuation_params={
	1: T_VW<P_f3_PD_continuation_params_f1>;
	3: T_VW<P_f3_PD_continuation_params_obj>;
	4: T_D32<1>;
	6: T_D32<0>;
};
type P_transcript_params={
	1: TV_Str<"asr">;
	2: TV_Str<"en">;
	3: T_VW_J<{}>;
};
type PE_transcript_params={
	1: TV_Str<D_VideoIdStr>;
	2: TV_Str<string>;
	3: T_D32<1>;
	6: T_D32<0>;
	7: T_D32<1>;
	8: T_D32<0>;
}|{
	1: TV_Str<D_VideoIdStr>;
	2: TV_Str<string>;
	3: T_D32<1>;
	6: T_D32<1>;
	7: T_D32<1>;
	8: T_D32<1>;
};