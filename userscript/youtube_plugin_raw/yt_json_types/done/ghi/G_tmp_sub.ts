type GRC_ServiceTrackingParams=[
	RC_Csi_SPs,
	RC_ECatcher_SPs,
	RC_GFeedback_SPs,
	RC_GoogleHelp_SPs,
	RC_GuidedHelp_SPs,
][number];
type V_ParamMapValue=number|string|['bigint',number[],bigint]|['group',D_DecTypeNum[]]|["failed",D_DecTypeNum[]|null]|V_ParamMapType;
type G_ResponseActions=
	TA_OpenPopup_Empty|
	AU_NotificationsUnseenCount|
	A_RemoveFromGuideSection|
	A_AddToGuideSection|
	never;
type G_ResponseTypes=
	|B_GenericResponseType
	|WD_account_account_menu
	|WD_account_set_setting
	|WD_accounts_list
	|WD_att_get
	|WD_att_log
	|WD_browse
	|WD_browse_edit_playlist
	|WD_feedback
	|WD_get_notification_menu
	|WD_get_survey
	|WD_get_transcript
	|WD_GetAccountSwitcherEndpoint
	|WD_getDatasyncIdsEndpoint
	|WD_guide
	|WD_like_dislike
	|WD_like_like
	|WD_like_removelike
	|WD_live_chat_get_live_chat
	|WD_live_chat_get_live_chat_replay
	|WD_music_get_search_suggestions
	|WD_next
	|WD_notification_get_unseen_count
	|WD_notification_modify_channel_preference
	|WD_notification_record_interactions
	|WD_pdg_get_pdg_buy_flow
	|WD_player
	|WD_playlist_get_add_to_playlist
	|WD_reel_reel_item_watch
	|WD_reel_reel_watch_sequence
	|WD_search
	|WD_share_get_share_panel
	|WD_subscription_subscribe
	|WD_subscription_unsubscribe
	|WD_update_metadata
	;
;
type G_RichGridContent=R_RichItem|R_ContinuationItem;
type G_RichItemContent=R_AdSlot|R_Video|R_Radio|R_FeedNudge;
type G_SecondaryContents=R_ProfileColumn|R_BrowseFeedActions;
type G_SectionItem=[
	R_RichItem,
	R_RichSection,
	R_CommentsHeader,
	R_CommentThread,
	R_CompactVideo,
	R_ContinuationItem,
][number];
type G_SettingsEndpointPages=`/account${""|`_${G_AccountPageSettingsSections}`}`;
type G_SettingsOptionItem=
	R_ChannelOptions|
	R_SettingsSwitch|
	R_SettingsCheckbox|
	R_SettingsRadioOption|
	R_CopyLink;
type G_ShelfItem={
	gridRenderer: R_Grid;
};
type G_ShortsSurfaceIdentifier_ValidTag=
	|"engagement-panel-structured-description"
	|"shorts-comments-panel"
	;
;
type G_StructuredDescriptionContentItem=[
	R_ExpandableVideoDescriptionBody,
	R_HorizontalCardList,
	R_VideoDescriptionHeader,
	R_VideoDescriptionMusicSection,
][number];

type D_ThumbnailOverlayInlineUnplayable={};

type R_ThumbnailOverlayInlineUnplayable={
	thumbnailOverlayInlineUnplayableRenderer: D_ThumbnailOverlayInlineUnplayable;
};

type G_ThumbnailOverlayItem=
	|R_ThumbnailOverlayBottomPanel
	|R_ThumbnailOverlayHoverText
	|R_ThumbnailOverlayLoadingPreview
	|R_ThumbnailOverlayNowPlaying
	|R_ThumbnailOverlayTimeStatus
	|R_ThumbnailOverlayToggleButton
	|R_ThumbnailOverlayResumePlayback
	|R_ThumbnailOverlayEndorsement
	|R_ThumbnailOverlaySidePanel
	|R_ThumbnailOverlayInlineUnplayable
	;
;
type G_TopbarButtonItem=R_TopbarMenuButton|R_NotificationTopbarButton;
type G_UrlInfoItem=D_UrlInfoPlaylist|D_UrlInfoVideo|{
	_tag: "video-referral";
	id: string;
}|{
	_tag: "play-next";
	value: string;
};
type G_WatchNext=R_CompactVideo|R_ContinuationItem;
type G_WatchNextEndScreenItem=R_EndScreenPlaylist|
	R_EndScreenVideo;
type G_YtWatchUrl=[
	D_PlayerParamsUrl,
	D_WatchPlaylistUrlFormat,
][number];
type G_PlaylistSidebarItem=R_PlaylistSidebarPrimaryInfo|R_PlaylistSidebarSecondaryInfo;
