type D_CF_L_Params=D_CF_L_Params_base|D_CF_L_Params_ext;
type D_CF_L_Params_base=
	|"A_AddToGuideSection"
	|"A_HideEnclosing"
	|"A_ShowEngagementPanelScrim"
	|"AE_Browse"
	|"B_HrefUrl.url"
	|"C_ScrollToEngagementPanel"
	|"D_AdLayoutLogging"
	|"D_AutoplayContent"
	|"D_AutoplaySwitchButton"
	|"D_C4TabbedHeader"
	|"D_CD_Reload"
	|"D_ChipCloud"
	|"D_ClipCreation"
	|"D_Comment"
	|"D_CommentsEntryPointTeaser"
	|"D_CommentsHeader"
	|"D_CommentSimplebox"
	|"D_CommonConfig.url"
	|"D_CommonConfig"
	|"D_CompactVideo"
	|"D_ConfirmDialog"
	|"D_DesktopTopbar"
	|"D_EndScreenPlaylist"
	|"D_EndScreenVideo"
	|"D_EngagementPanelTitleHeader"
	|"D_EntityMutationItem"
	|"D_FeaturedChannel"
	|"D_FeedFilterChipBar"
	|"D_FusionSearchbox"
	|"D_GuideEntry"
	|"D_GuideSection"
	|"D_GuideSubscriptionsSection"
	|"D_Hint"
	|"D_HorizontalCardList"
	|"D_HotkeyDialog"
	|"D_ItemSection_2_CommentItemSection"
	|"D_LikeButton.rest"
	|"D_LoggingDirectives"
	|"D_MacroMarkersList"
	|"D_Menu"
	|"D_MenuNavigationItem"
	|"D_MenuServiceItem"
	|"D_MerchandiseShelf"
	|"D_MusicCarouselShelf"
	|"D_MusicShelf"
	|"D_MusicThumbnail"
	|"D_NextContinuation"
	|"D_Notification"
	|"D_NotificationAction"
	|"D_NotificationMenu_PopupItem"
	|"D_NotificationMenuPopupMenuItem"
	|"D_NotificationText"
	|"D_NotificationTopbarButton"
	|"D_PdgBuyFlow"
	|"D_PivotButton"
	|"D_PlayerOverlayAutoplay"
	|"D_PlaylistAddToOption"
	|"D_PlaylistContent"
	|"D_PlaylistEdit"
	|"D_PlaylistHeader"
	|"D_PlaylistPanelVideo"
	|"D_PlaylistSidebar"
	|"D_PlaylistVideoThumbnail"
	|"D_ProductList"
	|"D_ReelPlayerHeader"
	|"D_ReelPlayerOverlay"
	|"D_ReelWatch"
	|"D_RichGrid"
	|"D_RichItem"
	|"D_SearchBox"
	|"D_SearchFeedSectionList"
	|"D_SectionList_BrowseFeed_Subscriptions"
	|"D_SerializedSlotAdServingDataEntry"
	|"D_SortFilterSubMenu"
	|"D_SubFeedOption"
	|"D_SubFeedSelector"
	|"D_SubscribeButton"
	|"D_SubscriptionNotificationToggleButton"
	|"D_SuperVodBuyFlowContent"
	|"D_Tab_R_MusicQueue"
	|"D_Tab"
	|"D_TemplateUpdate"
	|"D_ThumbnailOverlayToggleButton"
	|"D_ToggleButton"
	|"D_ToggleMenuServiceItem"
	|"D_TopbarLogo"
	|"D_TopbarMenuButton_MenuItem"
	|"D_Transcript"
	|"D_TranscriptSearchPanel"
	|"D_Video"
	|"D_VideoPrimaryInfo"
	|"D_VideoSecondaryInfo"
	|"D_Watch"
	|"D_WatchNextEndScreen"
	|"D_WatchPlaylist"
	|"D_WatchResult_ResultsItem"
	|"D_YpcGetCart"
	|"D_YpcGetOffers"
	|"DC_LiveChat"
	|"DC_Timed"
	|"DE_Browse_VE"
	|"DE_CreateBackstagePost.createBackstagePostParams"
	|"DE_GetNotificationMenu"
	|"DE_GetTranscript"
	|"DE_MutationItem"
	|"DE_RecordNotificationInteractions"
	|"DE_Subscribe"
	|"DE_VE3832_Watch"
	|"DMD_Badge"
	|"DMD_RowContainer"
	|"DS_CreatePlaylist"
	|"DS_EY_TranscriptTrackSelection"
	|"E_LikeDislike"
	|"E_LikeIndifferent"
	|"E_LikeLike"
	|"E_Url"
	|"E_Watch"
	|"EA_ChangeEngagementPanelVisibility"
	|"ES_ShareEntity"
	|"G_SectionList"
	|"G_Watch_SecondaryResults_Results"
	|"GM_WC_Base"
	|"GM_WC"
	|"MC_ResolveUrl"
	|"MP_AccountMenu"
	|"MP_MenuNotificationSection"
	|"R_Generic_WatchPage"
	|"R_ThumbnailsList"
	|"R_VE3832_WatchPage"
	|"R_WatchPage_Generic"
	|"R_WatchPage_VE3832"
	|"RS_AccountMenu"
	|"RS_Browse"
	|"RS_Channel"
	|"RS_GetAddToPlaylist"
	|"RS_GetLiveChat"
	|"RS_Guide"
	|"RS_Next"
	|"RS_Playlist"
	|"RS_Reel"
	|"RS_ReelItemWatch"
	|"RS_ReelWatchSequence"
	|"RS_Search"
	|"RS_Settings"
	|"RS_Subscribe"
	|"RS_Unsubscribe"
	|"RSB_EditPlaylist"
	|"RSG_NotificationMenu"
	|"RSG_PdgBuyFlow"
	|"RSG_SearchSuggestions"
	|"RSG_SharePanel.actions[]"
	|"RSG_SharePanel"
	|"RSG_Survey"
	|"RSG_Transcript"
	|"RSM_ChannelPreference"
	|"RSW_ReelItem"
	|"S_Client_Popup"
	|"T_Command_TP"
	|"TA_OpenPopup"
	|"TD_ItemSection_1_CommentsEntryPoint"
	|"TD_ItemSection_3"
	|"TE_SignalService_I_0"
	|"UA_EngagementPanel"
	|"UA_NotificationsUnseenCount";
type D_CF_L_Params_ext=
	|`${D_CF_T_Endpoint}.endpoint`
	|D_CF_D_Button
	|D_CF_D_ChipCloudChip_Omit
	|D_CF_D_Link
	|D_CF_GE_ResponseReceived
	|D_CF_Omit_Menu_Radio
	|D_CF_T_Endpoint
	|D_CF_D_Params;
type D_CF_D_Link=[
	|"D_CompactLink"
	|"D_CompactLink.Styled"
][number];
type D_CF_D_Button=
	|"D_Button"
	|`D_Button.${"Mixed"|"Styled"|"WithAccessibility"}`;
type D_CF_GE_ResponseReceived=
	|"RS_Next"
	|"RS_Watch";
type D_CF_Omit_Menu_Radio=
	|"D_CompactRadio"
	|"D_CompactVideo"
	|"D_PlayerOverlayAutoplay"
	|"D_PlaylistSidebarPrimaryInfo"
	|"D_Radio"
	|"D_Video";
type D_CF_D_ChipCloudChip_Omit="D_ChipCloudChip";
