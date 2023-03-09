//#region G_RS
type G_RS_Page_Playlist=RS_PlaylistPage|RS_VE5754_Page_Playlist;
//#endregion
//#region from G_EY.ts
type G_EY_Entity=
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
type G_SI_DB_EngagementPanel=
	|SI_DB_EngagementPanel_Ads
	|SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters
	|SI_DB_EngagementPanel_ClipCreate
	|SI_DB_EngagementPanel_MacroMarkers_AutoChapters
	;
;
//#endregion
//#region Action Renderers and Actions (from G_RA.ts)
type G_RA_LiveChatContinuationActions=
	|A_ReplayChatItem
	|A_AddChatItem
	;
;
//#endregion
//#region (from G.ts)
//#region done
type G_LiveChatContinuationItem=
	|CD_Invalidation
	|CD_LiveChatReplay
	|CD_PlayerSeek
	;
;
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
type G_CardList_StyleType="HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION";
type G_AccountItemSection=R_AccountItem|R_CompactLink;
type G_AccountPageSettingsSections=
	|"advanced"
	|"billing"
	|"notifications"
	|"privacy"
	|"sharing"
	|"playback"
	;
;
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
type G_CodecType=
	|G_CodecTypeStr
	|T_SplitOnce<G_GenericCodecType,".">[0]
	;
;
type G_CodecTypeStr="opus"|"vp9";
type G_EngagementPanelMenu=R_Menu|R_SortFilterSubMenu;
type G_ExtraUrlParamItem={key: "inline";};
type G_FollowUpOption=R_RadioButtonSurveyOption|R_CheckboxSurveyOption;
type G_FormatQuality=
	|"hd2160"|"hd1440"|"hd1080"|"hd720"
	|"large"|"medium"|"small"|"tiny"
	;
;
type G_GenericCodecType=
	|S_acv1_codec
	|"mp4a.40.2"
	// av1 profile=0 level_id=08M bit_depth=8-bit
	|"av01.0.08M.08"
	;
;
type G_GuideItem=R_GuideSection|R_GuideSubscriptionsSection;
type G_GuideSectionItem=
	|R_GuideCollapsibleEntry
	|R_GuideCollapsibleSectionEntry
	|R_GuideDownloadsEntry
	|R_GuideEntry
	|R_GuideSection
	|R_GuideSubscriptionsSection
	;
;
type G_GuideSubscriptionsSectionItem=
	|R_GuideEntry
	|R_GuideCollapsibleEntry
	;
;
type G_HexNibbleStr=T_Split<"abcdef0123456789","">[number];
type G_ItemSectionItems=R_CompactRadio|R_ContinuationItem|R_CompactVideo|R_CompactPlaylist|R_AdSlot;
type G_MenuItem=R_MenuServiceItem|R_ToggleMenuServiceItem|R_MenuNavigationItem;
type G_MimeTypeFormat=
	|`video/mp4; codecs="${S_acv1_codec}"`
	|`video/mp4; codecs="av01.0.08M.08"`
	|`video/webm; codecs="vp9"`
	|`audio/mp4; codecs="mp4a.40.2"`
	|`audio/webm; codecs="opus"`
	;
;
type G_PopupItem=
	|R_ConfirmDialog
	|TR_MultiPageMenu_Empty
	|RA_Notification
	|R_PdgBuyFlow
	|R_UnifiedSharePanel
	|R_VoiceSearchDialog
	;
;
type G_ProfileColumnItem=R_ProfileColumnUserInfo|R_ProfileColumnStats;
type G_EngagementPanelSectionShowCommands=A_ChangeEngagementPanelVisibility|A_ShowEngagementPanelScrim|C_ScrollToEngagementPanel;
type G_ClientSignal={signal: "CLIENT_SIGNAL"; actions: G_ClientSignal_Item[];};
type G_ClientSignal_Item=
	|A_SendFeedback
	|A_Signal
	|C_AddToPlaylist
	|E_ShowEngagementPanel
	|A_ClientSignal
	;
;
type G_RichSection=R_RichShelf|R_InlineSurvey|R_SourcePivotHeader;
type G_Text={
	runs?: D_TextRun[];
	simpleText?: string;
	accessibility?: D_Accessibility;
};
type G_Text_Base={accessibility?: D_Accessibility;};
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
type G_ResponseActions=
	|TA_OpenPopup_Empty
	|AU_NotificationsUnseenCount
	|A_RemoveFromGuideSection
	|A_AddToGuideSection
	|never
	;
;
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
type G_SectionItem=
	|R_RichItem
	|R_RichSection
	|R_CommentsHeader
	|R_CommentThread
	|R_CompactVideo
	|R_ContinuationItem
	;
;
type G_SettingsOptionItem=
	|R_ChannelOptions
	|R_SettingsSwitch
	|R_SettingsCheckbox
	|R_SettingsRadioOption
	|R_CopyLink
	;
;
type G_ShortsSurfaceIdentifier_ValidTag=
	|"engagement-panel-structured-description"
	|"shorts-comments-panel"
	;
;
type G_StructuredDescriptionContentItem=
	|R_ExpandableVideoDescriptionBody
	|R_HorizontalCardList
	|R_VideoDescriptionHeader
	|R_VideoDescriptionMusicSection
	|R_VideoDescriptionCourseSection
	;
;
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
type G_WatchNext=
	|R_CompactPlaylist
	|R_CompactVideo
	|R_ContinuationItem
	;
;
type G_WatchNextEndScreenItem=
	|R_EndScreenPlaylist
	|R_EndScreenVideo
	;
;
type G_YtWatchUrl=
	|D_PlayerParamsUrl
	|D_WatchPlaylistUrlFormat
	;
;
type G_PlaylistSidebarItem=R_PlaylistSidebarPrimaryInfo|R_PlaylistSidebarSecondaryInfo;
type G_AdPlacementRendererItem=
	|R_AdBreakService
	|R_ClientForecastingAd
	|R_InstreamVideoAd
	|R_LinearAdSequence
	;
;
type G_NextContents=R_TwoColumnWatchNextResults|R_SingleColumnMusicWatchNextResults;
//#endregion
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
//#endregion
//#region (from G_SE.ts)
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
//#endregion
