import {
	REG_AccountSwitcher,REG_DatasyncIds,
	RSB_EditPlaylist,
	RSG_AddToPlaylist,
	RSG_GetUnseenCount,
	RSG_NotificationMenu,
	RSG_PdgBuyFlow,
	RSG_SearchSuggestions,
	RSG_SharePanel,
	RSG_Survey,RSG_Transcript,
	RSL_Dislike,RSL_Like,RSL_RemoveLike,
	RSM_ChannelPreference,
	RS_AccountMenu,RS_AccountsList,RS_AttGet,RS_AttLog_RC,RS_Browse,RS_Feedback,RS_GetLiveChat,RS_Guide,RS_Next,RS_Player,RS_ReelWatchSequence,RS_Search,RS_SetSetting,RS_Subscribe,RS_Success,RS_Unsubscribe,RS_UpdateMetadata,RS_WatchReelItem
} from "../r/group_R.js";

export type WD_account_account_menu={type: "account.account_menu"; data: RS_AccountMenu;};
export type WD_account_set_setting={type: "account.set_setting"; data: RS_SetSetting;};
export type WD_accounts_list={type: "account.accounts_list"; data: RS_AccountsList;};
export type WD_att_get={type: "att.get"; data: RS_AttGet;};
export type WD_att_log={type: "att.log"; data: RS_AttLog_RC;};
export type WD_browse_edit_playlist={type: "browse.edit_playlist"; data: RSB_EditPlaylist;};
export type WD_browse={type: "browse"; data: RS_Browse;};
export type WD_feedback={type: "feedback"; data: RS_Feedback;};
export type WD_get_notification_menu={type: "notification.get_notification_menu"; data: RSG_NotificationMenu;};
export type WD_get_survey={type: "get_survey"; data: RSG_Survey;};
export type WD_get_transcript={type: "get_transcript"; data: RSG_Transcript;};
export type WD_GetAccountSwitcherEndpoint={type: "getAccountSwitcherEndpoint"; data: REG_AccountSwitcher;};
export type WD_getDatasyncIdsEndpoint={type: "getDatasyncIdsEndpoint"; data: REG_DatasyncIds;};
export type WD_guide={type: "guide"; data: RS_Guide;};
export type WD_like_dislike={type: "like.dislike"; data: RSL_Dislike;};
export type WD_like_like={type: "like.like"; data: RSL_Like;};
export type WD_like_removelike={type: "like.removelike"; data: RSL_RemoveLike;};
export type WD_live_chat_get_live_chat_replay={type: "live_chat.get_live_chat_replay"; data: RS_GetLiveChat;};
export type WD_live_chat_get_live_chat={type: "live_chat.get_live_chat"; data: RS_GetLiveChat;};
export type WD_music_get_search_suggestions={type: "music.get_search_suggestions"; data: RSG_SearchSuggestions;};
export type WD_next={type: "next"; data: RS_Next;};
export type WD_notification_get_unseen_count={type: "notification.get_unseen_count"; data: RSG_GetUnseenCount;};
export type WD_notification_modify_channel_preference={type: "notification.modify_channel_preference"; data: RSM_ChannelPreference;};
export type WD_notification_record_interactions={type: "notification.record_interactions"; data: RS_Success;};
export type WD_pdg_get_pdg_buy_flow={type: "pdg.get_pdg_buy_flow"; data: RSG_PdgBuyFlow;};
export type WD_player={type: "player"; data: RS_Player;};
export type WD_playlist_get_add_to_playlist={type: "playlist.get_add_to_playlist"; data: RSG_AddToPlaylist;};
export type WD_reel_reel_item_watch={type: "reel.reel_item_watch"; data: RS_WatchReelItem;};
export type WD_reel_reel_watch_sequence={type: "reel.reel_watch_sequence"; data: RS_ReelWatchSequence;};
export type WD_search={type: "search"; data: RS_Search;};
export type WD_share_get_share_panel={type: "share.get_share_panel"; data: RSG_SharePanel;};
export type WD_subscription_subscribe={type: "subscription.subscribe"; data: RS_Subscribe;};
export type WD_subscription_unsubscribe={type: "subscription.unsubscribe"; data: RS_Unsubscribe;};
export type WD_update_metadata={type: "updated_metadata"; data: RS_UpdateMetadata;};