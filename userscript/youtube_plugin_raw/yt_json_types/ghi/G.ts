//#region G_RS
type G_RS_Page_Playlist=RS_Page_Playlist|RS_VE5754_Page_Playlist;
//#endregion

// all from GR_CD.ts
type G_LiveChatContinuationItem=
	|CD_Invalidation
	|CD_LiveChatReplay
	|CD_PlayerSeek
	;
;

// all from GR_EY.ts
type G_EY_Entity=
	|EY_MacroMarkersList
	|EY_Offlineability
	|EY_TranscriptTrackSelection
	|S_EY_PlaylistLoop
	|S_EY_Subscription
	|S_EY_TranscriptSearchBox
	;
;

// from GR_SI.ts
type G_SI_DB_EngagementPanel=
	|SI_DB_EngagementPanel_Ads
	|SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters
	|SI_DB_EngagementPanel_ClipCreate
	|SI_DB_EngagementPanel_MacroMarkers_AutoChapters
	;
;

// from Action Renderers and Actions (GR_RA.ts, GR_A.ts)
type G_RA_LiveChatContinuationActions=
	|A_ReplayChatItem
	|A_AddChatItem
	;
;
type GE_Browse=
	|E_VE3611
	|E_VE3854
	|E_VE5754
	|E_VE6827
	|E_VE11487
	|E_VE23462
	|E_VE42352
	|E_VE96368
	|E_VE6827
	;
;
type GE_Browse_WCM=GE_Browse["commandMetadata"];

type GE_ResponseReceived=
	|A_AppendContinuationItems
	|C_AdsControlFlowOpportunityReceived
	|C_ChangeKeyedMarkersVisibility
	|C_LoadMarkers
	|C_ReloadContinuationItems
	|E_SignalService_SendPost
	;
;
type GA_FormatItagArr=[
	18,
	133,134,135,136,137,140,160,
	242,243,244,247,248,249,250,251,278,298,299,
	302,303,308,315,394,395,396,397,398,399,
	400,401,
];
type GA_Playlist=A_ActionAddVideo|D_ActionRemoveVideoByVideoId|A_ActionSetPlaylistVideoOrder;
type GC_Button=
	|A_ChangeEngagementPanelVisibility
	|C_CommandExecutor
	|C_Continuation
	|C_GetSurvey
	|C_ShowReelsCommentsOverlay
	|E_AddToPlaylistService
	|E_CreateBackstagePost
	|E_Feedback
	|E_ShareEntityService
	|E_SignalService_SendPost
	|E_VE83769_Url
	|TA_OpenPopup_Empty
	;
;
type GD_EngagementPanelMenu={
	title: G_Text;
	contextualInfo: G_Text;
	menu: R_SortFilterSubMenu;
	visibilityButton: R_Button;
	trackingParams: string;
};
type GD_Icon=NonNullable<[
	T_Icon<D_AnyIconStr>,
	Extract<D_Button,{icon: any;}>['icon'],
	D_InfoRow['expandIcon'],
	D_TopicLink['callToActionIcon'],
	T_Icon<"LIBRARY_REMOVE">,
	D_ThumbnailOverlayHoverText['icon']
][number]>;
type GE_Continuation=E_GetNotificationMenu|C_Continuation|E_GetTranscript;
type G_SettingItemIdEnum=
	|"NOTIFICATION_SUBSCRIPTION_NOTIFICATIONS"
	|"NOTIFICATION_RECOMMENDATION_WEB_CONTROL"
	|"NOTIFICATION_COMMENT_WEB_CONTROL"
	|"NOTIFICATION_COMMENT_REPLY_OTHER_WEB_CONTROL"
	|"NOTIFICATION_USER_MENTION_WEB_CONTROL"
	|"NOTIFICATION_RETUBING_WEB_CONTROL"
	|"EMAIL_KIDS_NEWSLETTER"
	|"EMAIL_BLOCK_ALL"
	|"EMAIL_MARKETING_NEWSLETTER"
	|"EMAIL_PAID_NEWSLETTER"
	|"EMAIL_CREATOR_NEWSLETTER"
	;
;
type GV_sub_57yn=[
	"lk",
	"sd",
	"se",
	"sk",
	"sl",
	"ss",
	"sz",
][number];
type GV_sub_5s7n=[
	"76",
	"7d",
	"7s",
	"7y",
	"7z",
	"ee",
	"el"
][number];
type GV_Dig_sn_nx=[
	`57yn${GV_sub_57yn}`,
	`5s7n${GV_sub_5s7n}`,
][number];
// cSpell:ignoreRegExp /rr[12345?]---sn-.+?"/
// cSpell:ignoreRegExp /r[12345]---sn-.+?"/
// cSpell:ignoreRegExp /"sn-.+?"/
type GV_SubDomain_rr_SN=[
	"sn-nx5s7n7d",
	"sn-nx5s7n7s",
	"sn-nx5s7n7y",
	"sn-nx5s7n7z",
	"sn-nx5s7n76",
	"sn-nx5s7nee",
	"sn-nx5s7nel",
	"sn-nx57ynlk",
	"sn-nx57ynsd",
	"sn-nx57ynse",
	"sn-nx57ynsk",
	"sn-nx57ynsl",
	"sn-nx57ynss",
	"sn-nx57ynsz",
];
type GV_SubDomain=[
	"rr1---sn-nx5s7n7s",
	"rr1---sn-nx5s7n7z",
	"rr1---sn-nx57ynlk",
	"rr1---sn-nx57ynsd",
	"rr1---sn-nx57ynsk",
	"rr1---sn-nx57ynsl",
	"rr1---sn-nx57ynss",
	"rr1---sn-nx57ynsz",
	"rr1---sn-p5qlsny6",
	"rr2---sn-nx5s7nel",
	"rr2---sn-nx57ynsd",
	"rr2---sn-nx57ynsk",
	"rr2---sn-nx57ynsl",
	"rr2---sn-nx57ynsz",
	"rr3---sn-nx5s7n7d",
	"rr3---sn-nx5s7n7s",
	"rr3---sn-nx5s7n7y",
	"rr3---sn-nx5s7nee",
	"rr3---sn-nx57ynlk",
	"rr3---sn-nx57ynsd",
	"rr3---sn-nx57ynsl",
	"rr4---sn-nx5s7n7z",
	"rr4---sn-nx5s7nee",
	"rr4---sn-nx5s7nel",
	"rr4---sn-nx57ynsk",
	"rr4---sn-nx57ynss",
	"rr5---sn-nx5s7n7d",
	"rr5---sn-nx5s7n76",
	"rr5---sn-nx5s7nee",
	"rr5---sn-nx57ynlk",
	"rr5---sn-nx57ynsd",
	"rr5---sn-nx57ynse",
	"rr5---sn-nx57ynsl",
][number];

type GA_EditPlaylist=C_RefreshPlaylist|TA_OpenPopup_Empty;
type RSB_EditPlaylist={
	responseContext: RC_ResponseContext;
	actions: GA_EditPlaylist[];
	status: "STATUS_SUCCEEDED";
	playlistEditResults: G_PlaylistEditResult[];
	trackingParams: string;
};
type G_CardList_StyleType="HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION";
type G_AccountItemSection=R_AccountItem|R_CompactLink;
type G_AccountPageSettingsSections=[
	"advanced",
	"billing",
	"notifications",
	"privacy",
	"sharing",
	"playback",
][number];
type G_Actions=
	|A_AddToGuideSection
	|A_GetMultiPageMenu
	|A_RemoveFromGuideSection
	|AU_ChannelSwitcherPage
	|AU_NotificationsUnseenCount
	|AU_SubscribeButton
	|C_RefreshPlaylist
	|C_RunAttestation
	|TA_OpenPopup_Empty
	;
;
type G_Browse_MD=R_Channel_MD|R_Playlist_MD;
type G_BrowseContents=R_TwoColumnBrowseResults|R_FeedFilterChipBar;
type G_BrowseFeedContent=R_SearchBox|R_SubFeedSelector|R_Button|R_CompactLink;
type G_BrowseHeader=R_FeedTabbedHeader|R_C4TabbedHeader;
type G_BrowseSidebar=
	|R_SettingsSidebar
	|R_PlaylistSidebar
	;
;
type G_ChannelSwitcherContent=R_Button|A_AccountItem;
type G_ChatItem=
	|R_LiveChatTextMessage
	|R_LiveChatPlaceholderItem
	|R_LiveChatViewerEngagementMessage
	;
;
type G_CodecType=[
	G_CodecTypeStr,
	T_SplitOnce<G_GenericCodecType,".">[0]
][number];
type G_CodecTypeStr=[
	"opus",
	"vp9"
][number];
type G_CommandMetadata={
	webCommandMetadata: GM_All;
	resolveUrlCommandMetadata: MC_ResolveUrl;
}|{webCommandMetadata: GM_All;};
// COMPLETED: #7
type MC_ResolveUrl={
	isVanityUrl?: boolean;
	parentTrackingParams?: string;
};
type G_EngagementPanelMenu=R_Menu|R_SortFilterSubMenu;
type G_ExtraUrlParamItem={key: "inline";};
type G_FollowUpOption=R_RadioButtonSurveyOption|R_CheckboxSurveyOption;
type G_FormatQuality=[
	"hd2160","hd1440","hd1080","hd720",
	"large","medium","small","tiny",
][number];
type G_GenericCodecType=[
	S_acv1_codec,
	"mp4a.40.2",
	// av1 profile=0 level_id=08M bit_depth=8-bit
	"av01.0.08M.08"
][number];
type G_GuideItem=R_GuideSection|R_GuideSubscriptionsSection;
type G_GuideSectionItem=[
	R_GuideCollapsibleEntry,
	R_GuideCollapsibleSectionEntry,
	R_GuideDownloadsEntry,
	R_GuideEntry,
	R_GuideSection,
	R_GuideSubscriptionsSection,
][number];
type G_GuideSubscriptionsSectionItem=
	|R_GuideEntry
	|R_GuideCollapsibleEntry
	;
;
type G_HexNibbleStr=T_Split<"abcdef0123456789","">[number];
type G_ItemSectionItems=R_CompactRadio|R_ContinuationItem|R_CompactVideo|R_CompactPlaylist|R_AdSlot;
type G_MenuItem=R_MenuServiceItem|R_ToggleMenuServiceItem|R_MenuNavigationItem;
type G_MimeTypeFormat=[
	`video/mp4; codecs="${S_acv1_codec}"`,
	`video/mp4; codecs="av01.0.08M.08"`,
	`video/webm; codecs="vp9"`,
	`audio/mp4; codecs="mp4a.40.2"`,
	`audio/webm; codecs="opus"`,
][number];
type G_PopupItem=
	|R_ConfirmDialog
	|TR_MultiPageMenu<{}>
	|RA_Notification
	|R_PdgBuyFlow
	|R_UnifiedSharePanel
	|R_VoiceSearchDialog
	;
;
type G_ProfileColumnItem=R_ProfileColumnUserInfo|R_ProfileColumnStats;
type GC_EngagementPanelSectionShow=A_ChangeEngagementPanelVisibility|
	A_ShowEngagementPanelScrim|
	C_ScrollToEngagementPanel;
type G_EngagementPanelSectionShowCommands=A_ChangeEngagementPanelVisibility|A_ShowEngagementPanelScrim|C_ScrollToEngagementPanel;

type G_Action_GetNotificationsMenu_Popup=T_DropdownPopup_ReuseFlag<P_NotificationMenu_Popup>;
type G_Action_GetNotificationsMenu=TA_OpenPopup<G_Action_GetNotificationsMenu_Popup>;
type G_ClientSignal={signal: "CLIENT_SIGNAL"; actions: G_ClientSignal_Item[];};
type G_ClientSignal_Item=
	|A_SendFeedback
	|A_Signal
	|C_AddToPlaylist
	|E_ShowEngagementPanel
	|OP_ClientSignal
	;
;
type G_RichSection=R_RichShelf|R_InlineSurvey|R_SourcePivotHeader;
type G_Text={
	runs?: D_TextRun[];
	simpleText?: string;
	accessibility?: D_Accessibility;
};
type G_Text_Base={accessibility?: D_Accessibility;};
type G_SE_MenuService=
	|A_ChangeEngagementPanelVisibility
	|E_AddToPlaylistService
	|E_PlaylistEdit
	|E_Feedback
	|E_SignalService_SendPost
	|E_ShareEntityService
	|E_GetReportForm
	;
;
type G_PlaylistPanel_Item=R_AutomixPreviewVideo|R_PlaylistPanelVideo;
type G_AllSignalTypes=
	|Signal_GetNotificationsMenu
	|G_ClientSignal
	|G_AllSignalServiceEndpoint['signalServiceEndpoint']
	;
;
type G_AllSignalServiceEndpoint=D_NotificationTopbarButton['updateUnseenCountEndpoint'];
type G_AdditionalDataItem=
	|T_UserFeedbackEndpointProductSpecificValueData<"lockup","player">
	|T_UserFeedbackEndpointProductSpecificValueData<"video_id",string>
	;
;
type GRC_ServiceTrackingParams=[
	RC_Csi_SPs,
	RC_ECatcher_SPs,
	RC_GFeedback_SPs,
	RC_GoogleHelp_SPs,
	SP_GuidedHelp_SPs,
][number];
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
type G_ShelfItem={gridRenderer: R_Grid;};
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


type R_ThumbnailOverlayInlineUnplayable={thumbnailOverlayInlineUnplayableRenderer: D_ThumbnailOverlayInlineUnplayable;};

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
type G_PlaylistUrlInfo={
	type: "playlist:1:WL"; id: "WL";
}|{
	type: "playlist:1:LL"; id: "LL";
}|{
	type: "playlist:2:RDMM"; id: string; raw_id: `RDMM${string}`;
}|{
	type: "playlist:2:RDCM"; id: `UC${string}`; raw_id: `RDCMUC${string}`;
}|{
	type: "playlist:2:RD"; id: string; raw_id: `RD${string}`;
}|{
	type: "playlist:3:PL"; id: string; raw_id: `PL${string}`;
}|{
	type: "playlist:4:UU"; id: string; raw_id: `UU${string}`;
};
type G_ChannelUrlInfo={
	type: "channel_id:UC";
	id: string;
	raw_id: `UC${string}`;
};

type G_UrlInfoItem=G_PlaylistUrlInfo|{
	type: "video"; id: string;
}|{
	type: "video-referral"; id: string;
}|{
	type: "play-next"; value: string;
}|G_ChannelUrlInfo|{
	type: "browse_id:VL";
	id: `PL${string}`;
	raw_id: `VLPL${string}`;
};
type G_WatchNext=R_CompactVideo|R_ContinuationItem;
type G_WatchNextEndScreenItem=R_EndScreenPlaylist|
	R_EndScreenVideo;
type G_YtWatchUrl=[
	D_PlayerParamsUrl,
	D_WatchPlaylistUrlFormat,
][number];
type G_PlaylistSidebarItem=R_PlaylistSidebarPrimaryInfo|R_PlaylistSidebarSecondaryInfo;
type G_AdPlacementRendererItem=[
	R_AdBreakService,
	R_ClientForecastingAd,
	R_InstreamVideoAd,
	R_LinearAdSequence,
][number];
type GR_MP_MenuNotificationSection_Item=R_Notification|R_ContinuationItem;
type G_NextContents=R_TwoColumnWatchNextResults|R_SingleColumnMusicWatchNextResults;
type G_RendererContentItem=
	|R_RichItem
	|R_RichSection
	|R_CommentsHeader
	|R_CommentThread
	|R_ContinuationItem
	|R_CompactVideo
	|R_CompactPlaylist
	;
;
type GD_RC_SectionList=
	|DC_SectionListBase
	|{
		trackingParams: string;
		disablePullToRefresh: true;
	}
	|{
		contents: {
			itemSectionRenderer: {
				contents: R_Message[];
				trackingParams: string;
			};
		}[];
		trackingParams: string;
	}
	|DC_SectionList_SearchFeed
	|DC_SectionList_BrowseFeed_ChannelFeatured
	|DC_SectionList_BrowseFeed_Subscriptions
	|DC_SectionList_BrowseFeed_History
	;
;
