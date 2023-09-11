//#region G_RS
export type G_RS_Page_Playlist=RS_PlaylistPage|RS_VE5754_Page_Playlist;
//#endregion
//#region from G_EY.ts
export type G_EY_Entity=
	|EY_MacroMarkersList
	|EY_Offlineability
	|EY_TranscriptTrackSelection
	|S_EY_PlaylistLoop
	|S_EY_Subscription
	|S_EY_TranscriptSearchBox
	|{superThanksSelectedTierEntity: {};}
	|{
		subscriptionNotificationStateEntity: {
			key: string;
			state: "SUBSCRIPTION_NOTIFICATION_STATE_OCCASIONAL";
		};
	}
	;
;
//#endregion
//#region Panel Section (from G_SI.ts)
export type G_SI_DB_EngagementPanel=
	|SI_DB_EngagementPanel_Ads
	|SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters
	|SI_DB_EngagementPanel_ClipCreate
	|SI_DB_EngagementPanel_MacroMarkers_AutoChapters
	;
;
//#endregion
//#region Action Renderers and Actions (from G_RA.ts)
export type G_RA_LiveChatContinuationActions=
	|A_ReplayChatItem
	|A_AddChatItem
	;
;
//#endregion
//#region (from G.ts)
//#region done
export type G_LiveChatContinuationItem=
	|CD_Invalidation
	|CD_LiveChatReplay
	|CD_PlayerSeek
	;
;
export type G_SettingItemIdEnum=
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
export type G_CardList_StyleType="HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION";
export type G_AccountItemSection=R_AccountItem|R_CompactLink;
export type G_AccountPageSettingsSections=
	|"advanced"
	|"billing"
	|"notifications"
	|"privacy"
	|"sharing"
	|"playback"
	;
;
export type G_Actions=
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
export type G_Browse_MD=R_Channel_MD|R_Playlist_MD;
export type G_BrowseContents=R_TwoColumnBrowseResults|R_FeedFilterChipBar;
export type G_BrowseFeedContent=R_SearchBox|R_SubFeedSelector|R_Button|R_CompactLink;
export type G_BrowseHeader=R_FeedTabbedHeader|R_C4TabbedHeader;
export type G_BrowseSidebar=
	|R_SettingsSidebar
	|R_PlaylistSidebar
	;
;
export type G_ChannelSwitcherContent=R_Button|A_AccountItem;
export type G_ChatItem=
	|R_LiveChatTextMessage
	|R_LiveChatPlaceholderItem
	|R_LiveChatViewerEngagementMessage
	;
;
export type G_CodecType=
	|G_CodecTypeStr
	|T_SplitOnce<G_GenericCodecType,".">[0]
	;
;
export type G_CodecTypeStr="opus"|"vp9";
export type G_EngagementPanelMenu=R_Menu|R_SortFilterSubMenu;
export type G_ExtraUrlParamItem={key: "inline";};
export type G_FollowUpOption=R_RadioButtonSurveyOption|R_CheckboxSurveyOption;
export type G_FormatQuality=
	|"hd2160"|"hd1440"|"hd1080"|"hd720"
	|"large"|"medium"|"small"|"tiny"
	;
;
export type G_GenericCodecType=
	|S_acv1_codec
	|"mp4a.40.2"
	// av1 profile=0 level_id=08M bit_depth=8-bit
	|"av01.0.08M.08"
	;
;
export type G_GuideItem=R_GuideSection|R_GuideSubscriptionsSection;
export type G_GuideSectionItem=
	|R_GuideCollapsibleEntry
	|R_GuideCollapsibleSectionEntry
	|R_GuideDownloadsEntry
	|R_GuideEntry
	|R_GuideSection
	|R_GuideSubscriptionsSection
	;
;
export type G_GuideSubscriptionsSectionItem=
	|R_GuideEntry
	|R_GuideCollapsibleEntry
	;
;
export type G_HexNibbleStr=T_Split<"abcdef0123456789","">[number];
export type G_ItemSectionItems=R_CompactRadio|R_ContinuationItem|R_CompactVideo|R_CompactPlaylist|R_AdSlot;
export type G_MenuItem=R_MenuServiceItem|R_ToggleMenuServiceItem|R_MenuNavigationItem;
export type G_MimeTypeFormat=
	|`video/mp4; codecs="${S_acv1_codec}"`
	|`video/mp4; codecs="av01.0.08M.08"`
	|`video/webm; codecs="vp9"`
	|`audio/mp4; codecs="mp4a.40.2"`
	|`audio/webm; codecs="opus"`
	;
;
export type G_PopupItem=
	|R_ConfirmDialog
	|TR_MultiPageMenu_Empty
	|RA_Notification
	|R_PdgBuyFlow
	|R_UnifiedSharePanel
	|R_VoiceSearchDialog
	;
;
export type G_ProfileColumnItem=R_ProfileColumnUserInfo|R_ProfileColumnStats;
export type G_EngagementPanelSectionShowCommands=A_ChangeEngagementPanelVisibility|A_ShowEngagementPanelScrim|C_ScrollToEngagementPanel;
export type G_ClientSignal={signal: "CLIENT_SIGNAL"; actions: G_ClientSignal_Item[];};
export type G_ClientSignal_Item=
	|A_SendFeedback
	|A_Signal
	|C_AddToPlaylist
	|E_ShowEngagementPanel
	|A_ClientSignal
	;
;
export type G_RichSection=R_RichShelf|R_InlineSurvey|R_SourcePivotHeader;
export type G_Text={
	runs?: D_TextRun[];
	simpleText?: string;
	accessibility?: D_Accessibility;
};
export type G_Text_Base={accessibility?: D_Accessibility;};
export type G_PlaylistPanel_Item=R_AutomixPreviewVideo|R_PlaylistPanelVideo;
export type G_AllSignalTypes=
	|Signal_GetNotificationsMenu
	|G_ClientSignal
	|G_AllSignalServiceEndpoint['signalServiceEndpoint']
	;
;
export type G_AllSignalServiceEndpoint=D_NotificationTopbarButton['updateUnseenCountEndpoint'];
export type G_AdditionalDataItem=
	|T_UserFeedbackEndpointProductSpecificValueData<"lockup","player">
	|T_UserFeedbackEndpointProductSpecificValueData<"video_id",string>
	;
;
export type G_ResponseActions=
	|TA_OpenPopup_Empty
	|AU_NotificationsUnseenCount
	|A_RemoveFromGuideSection
	|A_AddToGuideSection
	|never
	;
;
export type G_ResponseTypes=
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
export type G_RichGridContent=R_RichItem|R_ContinuationItem;
export type G_RichItemContent=R_AdSlot|R_Video|R_Radio|R_FeedNudge;
export type G_SecondaryContents=R_ProfileColumn|R_BrowseFeedActions;
export type G_SectionItem=
	|R_RichItem
	|R_RichSection
	|R_CommentsHeader
	|R_CommentThread
	|R_CompactVideo
	|R_ContinuationItem
	;
;
export type G_SettingsOptionItem=
	|R_ChannelOptions
	|R_SettingsSwitch
	|R_SettingsCheckbox
	|R_SettingsRadioOption
	|R_CopyLink
	;
;
export type G_ShortsSurfaceIdentifier_ValidTag=
	|"engagement-panel-structured-description"
	|"shorts-comments-panel"
	;
;
export type G_StructuredDescriptionContentItem=
	|R_ExpandableVideoDescriptionBody
	|R_HorizontalCardList
	|R_VideoDescriptionHeader
	|R_VideoDescriptionMusicSection
	|R_VideoDescriptionCourseSection
	;
;
export type G_ThumbnailOverlayItem=
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
export type G_TopbarButtonItem=R_TopbarMenuButton|R_NotificationTopbarButton;
export type G_WatchNext=
	|R_CompactPlaylist
	|R_CompactVideo
	|R_ContinuationItem
	;
;
export type G_WatchNextEndScreenItem=
	|R_EndScreenPlaylist
	|R_EndScreenVideo
	;
;
export type G_YtWatchUrl=
	|D_PlayerParamsUrl
	|D_WatchPlaylistUrlFormat
	;
;
export type G_PlaylistSidebarItem=R_PlaylistSidebarPrimaryInfo|R_PlaylistSidebarSecondaryInfo;
export type G_AdPlacementRendererItem=
	|R_AdBreakService
	|R_ClientForecastingAd
	|R_InstreamVideoAd
	|R_LinearAdSequence
	;
;
export type G_NextContents=R_TwoColumnWatchNextResults|R_SingleColumnMusicWatchNextResults;
//#endregion
export type G_RendererContentItem=
	|R_RichItem
	|R_RichSection
	|R_CommentsHeader
	|R_CommentThread
	|R_ContinuationItem
	|R_CompactVideo
	|R_CompactPlaylist
	;
;
//#endregion
//#region (from G_SE.ts)
export type G_SE_MenuService=
	|A_ChangeEngagementPanelVisibility
	|E_AddToPlaylistService
	|E_PlaylistEdit
	|E_Feedback
	|E_SignalService_SendPost
	|E_ShareEntityService
	|E_GetReportForm
	;
;
//#endregion

export type G_NavFinishDetail=
	|NavFinishDetail_Browse
	|NavFinishDetail_Channel
	|NavFinishDetail_Playlist
	|NavFinishDetail_Settings
	|NavFinishDetail_Shorts
	|NavFinishDetail_Watch
	|NavFinishDetail_Search
	;
;
//#region derived
export type E_Page=G_NavFinishDetail['endpoint'];
export type S_PageTypeStr=G_NavFinishDetail["pageType"];
//#endregion
//#region G_DE Union
export type G_DE_MutationItem=DE_MutationReplace|DE_MutationDelete;
export type G_DE_UserFeedback=DE_AdditionalDatas|DE_BucketIdentifier;
//#endregion
//#region g.mod
export type G_UrlInfoSrc=
	|{b: "playlist_id"; id: DU_Playlist_Id;}
	|{b: "browse_id"; id: string;}
	;
;
type G_Boxed_StrArr=[
	Join<Extract<G_Boxed_StrExtract,[any,any]>,":">,
	// 3
	Join<Extract<G_Boxed_StrExtract,[any,any,any]>,":">,
	// 4
	Join<Exclude<Extract<G_Boxed_StrExtract,[any,any,any,any]>,[any,any,"FE",any]>,":">,
	Join<Extract<Extract<G_Boxed_StrExtract,[any,any,any,any]>,[any,any,"FE",any]>,":">,
	// 5
	Join<Extract<G_Boxed_StrExtract,[any,any,any,any,any]>,":">,
	// 6
	Join<Extract<G_Boxed_StrExtract,[any,any,any,any,any,any]>,":">
];

//#endregion
