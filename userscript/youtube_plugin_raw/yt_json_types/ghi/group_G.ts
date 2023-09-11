import {T_Split} from "../../support_0_mod/T_Split.mod.js";
import {Join} from "../../support_1/Join.js";
import {AU_ChannelSwitcherPage,AU_NotificationsUnseenCount,AU_SubscribeButton,A_AccountItem,A_AddChatItem,A_AddToGuideSection,A_ChangeEngagementPanelVisibility,A_GetMultiPageMenu,A_RemoveFromGuideSection,A_ReplayChatItem,A_SendFeedback,A_ShowEngagementPanelScrim,A_Signal} from "../abc/A.js";
import {B_GenericResponseType} from "../abc/B.js";
import {CD_Invalidation,CD_LiveChatReplay,CD_PlayerSeek,C_AddToPlaylist,C_RefreshPlaylist,C_RunAttestation,C_ScrollToEngagementPanel} from "../abc/C.js";
import {D_Accessibility,D_AutoplaySetItem,D_EY_Offlineability,D_ModifiedSetItem,D_NotificationTopbarButton,D_PlaylistContent,D_TextRun,D_TimedTextApi,D_TimedTextApi_Req,D_WatchPlaylistUrlFormat} from "../d/group_D.js";
import {DE_AdditionalDatas,DE_BucketIdentifier,DE_MutationDelete,DE_MutationReplace,DE_Url} from "../d/group_DE.js";
import {DU_Playlist_Id,D_PlayerParamsUrl,D_ResultsPageUrl,GV_SubDomain,S_acv1_codec,T_IdTemplate} from "../d/mod_D/DU_T/DU.js";
import {R_Button} from "../d/mod_D/D_T/D_Button.js";
import {E_AddToPlaylistService,E_Feedback,E_GetReportForm,E_PlaylistEdit,E_ShareEntityService,E_ShowEngagementPanel,E_SignalService_SendPost} from "../e/E.js";
import {make_item_group} from "../m/make_item_group.js";
import {A_ClientSignal,TA_OpenPopup_Empty,TR_MultiPageMenu_Empty} from "../nop_q/Popup.js";
import {GM_VE12924,NavFinishDetail_Watch,RA_Notification,RS_Browse,RS_Channel,RS_Page_Settings,RS_Page_Shorts,RS_Page_Watch,RS_PlaylistPage,RS_VE23462_Page_Settings,RS_VE37414_Shorts,RS_VE3832_Page_Watch,RS_VE5754_Page_Playlist,RS_WatchReelItem,R_AccountItem,R_AdBreakService,R_AdSlot,R_AutomixPreviewVideo,R_BrowseFeedActions,R_C4TabbedHeader,R_ChannelOptions,R_Channel_MD,R_CheckboxSurveyOption,R_ClientForecastingAd,R_CommentThread,R_CommentsEntryPointHeader,R_CommentsHeader,R_CompactLink,R_CompactPlaylist,R_CompactRadio,R_CompactVideo,R_ConfirmDialog,R_ContinuationItem,R_CopyLink,R_EndScreenPlaylist,R_EndScreenVideo,R_ExpandableVideoDescriptionBody,R_FeedFilterChipBar,R_FeedNudge,R_FeedTabbedHeader,R_GuideCollapsibleEntry,R_GuideCollapsibleSectionEntry,R_GuideDownloadsEntry,R_GuideEntry,R_GuideSection,R_GuideSubscriptionsSection,R_HorizontalCardList,R_InlineSurvey,R_InstreamVideoAd,R_LinearAdSequence,R_LiveChatPlaceholderItem,R_LiveChatTextMessage,R_LiveChatViewerEngagementMessage,R_Menu,R_MenuNavigationItem,R_MenuServiceItem,R_MerchandiseShelf,R_NotificationTopbarButton,R_Page,R_PdgBuyFlow,R_PlaylistPanelVideo,R_PlaylistSidebar,R_PlaylistSidebarPrimaryInfo,R_PlaylistSidebarSecondaryInfo,R_Playlist_MD,R_ProfileColumn,R_ProfileColumnStats,R_ProfileColumnUserInfo,R_Radio,R_RadioButtonSurveyOption,R_RelatedChipCloud,R_RichItem,R_RichSection,R_RichShelf,R_SearchBox,R_SettingsCheckbox,R_SettingsRadioOption,R_SettingsSidebar,R_SettingsSwitch,R_SingleColumnMusicWatchNextResults,R_SortFilterSubMenu,R_SourcePivotHeader,R_SubFeedSelector,R_ThumbnailOverlayBottomPanel,R_ThumbnailOverlayEndorsement,R_ThumbnailOverlayHoverText,R_ThumbnailOverlayLoadingPreview,R_ThumbnailOverlayNowPlaying,R_ThumbnailOverlayResumePlayback,R_ThumbnailOverlaySidePanel,R_ThumbnailOverlayTimeStatus,R_ThumbnailOverlayToggleButton,R_ToggleMenuServiceItem,R_TopbarMenuButton,R_TwoColumnBrowseResults,R_UnifiedSharePanel,R_Video,R_VideoDescriptionCourseSection,R_VideoDescriptionHeader,R_VideoDescriptionMusicSection,R_VideoPrimaryInfo,R_VideoSecondaryInfo,R_VoiceSearchDialog} from "../r/group_R.js";
import {NavFinishDetail_Browse} from "../r/r_sub/n/NavFinishDetail_Browse.js";
import {NavFinishDetail_Channel} from "../r/r_sub/n/NavFinishDetail_Channel.js";
import {NavFinishDetail_Playlist} from "../r/r_sub/n/NavFinishDetail_Playlist.js";
import {NavFinishDetail_Search} from "../r/r_sub/n/NavFinishDetail_Search.js";
import {NavFinishDetail_Settings} from "../r/r_sub/n/NavFinishDetail_Settings.js";
import {NavFinishDetail_Shorts} from "../r/r_sub/n/NavFinishDetail_Shorts.js";
import {SI_DB_EngagementPanel_Ads,SI_DB_EngagementPanel_ClipCreate,SI_DB_EngagementPanel_MacroMarkers_AutoChapters,SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters,Signal_GetNotificationsMenu} from "../stu/group_S.js";
import {TR_ItemSection_2,TR_ItemSection_3,T_Autoplay,T_GM_PostApi_WithApiUrl,T_Playlist,T_Results,T_SecondaryResults,T_SplitOnce,T_UserFeedbackEndpointProductSpecificValueData} from "../stu/group_T.js";
import {WD_GetAccountSwitcherEndpoint,WD_account_account_menu,WD_account_set_setting,WD_accounts_list,WD_att_get,WD_att_log,WD_browse,WD_browse_edit_playlist,WD_feedback,WD_getDatasyncIdsEndpoint,WD_get_notification_menu,WD_get_survey,WD_get_transcript,WD_guide,WD_like_dislike,WD_like_like,WD_like_removelike,WD_live_chat_get_live_chat,WD_live_chat_get_live_chat_replay,WD_music_get_search_suggestions,WD_next,WD_notification_get_unseen_count,WD_notification_modify_channel_preference,WD_notification_record_interactions,WD_pdg_get_pdg_buy_flow,WD_player,WD_playlist_get_add_to_playlist,WD_reel_reel_item_watch,WD_reel_reel_watch_sequence,WD_search,WD_share_get_share_panel,WD_subscription_subscribe,WD_subscription_unsubscribe,WD_update_metadata} from "../vw/group_WD.js";
import {GE_Browse_WCM} from "./g_.mod/group_GE.js";

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
export type G_Boxed_StrArr=[
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
export type G_Boxed_StrExtract=G_BoxedDatabaseData['key'] extends infer I?
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}:${infer f4}:${infer f5}`? [f0,f1,f2,f3,f4,f5]:
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}:${infer f4}`? [f0,f1,f2,f3,f4]:
	I extends `${infer f0}:${infer f1}:${infer f2}:${infer f3}`? [f0,f1,f2,f3]:
	I extends `${infer f0}:${infer f1}:${infer f2}`? [f0,f1,f2]:
	I extends `${infer f0}:${infer f1}`? [f0,f1]:[I]:never
	;
;
//#region G_BoxedDatabaseData
export type D_ManyValue={
	l: "many";
	z: [any[][]];
};
export type D_ArrValue={
	l: "arr";
	z: [any[]];
};
export type D_ExactValue={
	l: "one";
	z: [any];
};
export type DST_Group={
	key: `boxed_id:${string}:${string}`;
	z: [make_item_group<any>];
	_z: [string,string];
};
export type DST_SaveId={
	key: "boxed_id:save_id";
	z: [number];
	_z: ["save_id"];
};
export type DST_LoadId={
	key: "boxed_id:load_id";
	z: [number];
	_z: ["load_id"];
};
export type G_BoxedDatabaseData=DST_SaveId|DST_LoadId|DST_Group;
//#endregion
export type G_BoxedInner=[1,any];
;
;
export type Ret_w_dst=
	|[
		true,1,
		[
			x1: "",
			x2: string
		],
		[{}]
	]
	|[
		true,2,
		[
			x1: "",
			x2: ""
		],
		[{}]
	]
	|[false,4,[x1: ""],[any,any]]
	|[false,5,[],[any,any]]
	|[false,6,[],[]]
	;
;
export type U1=Ret_w_dst[2];
//#endregion g.mod
//#region GR_EY
export type EY_MacroMarkersList={macroMarkersListEntity: DS_EY_MacroMarkersList;};
export type EY_Offlineability={offlineabilityEntity: D_EY_Offlineability;};
export type S_EY_Subscription={subscriptionStateEntity: DS_EY_Subscription;};
export type S_EY_PlaylistLoop={playlistLoopStateEntity: DS_EY_PlaylistLoop;};
export type EY_TranscriptTrackSelection={transcriptTrackSelectionEntity: DS_EY_TranscriptTrackSelection;};
export type S_EY_TranscriptSearchBox={transcriptSearchBoxStateEntity: DS_EY_TranscriptSearchBox;};
//#endregion

export type GA_EditPlaylist=C_RefreshPlaylist|TA_OpenPopup_Empty;


//#region GU
export type GU_VE3611_Url=
	|"/gaming"
	|`/@${string}`
	|`/c/${string}`
	|`/channel/UC${string}`
	|`/source/${string}/shorts?bp=${string}`
	|`/user/${string}`
	;
;
export type GU_VE6827_Id=
	|"FEguide_builder"
	|"FEhashtag"
	|"FEhistory"
	|"FElibrary"
	|"FEsfv_audio_pivot"
	|"FEstorefront"
	|"FEtrending"
	|"SPreport_history"
	;
;
export type GU_VE6827_Url=
	|"/feed/guide_builder"
	|`/feed/history`
	|`/feed/library`
	|`/feed/storefront?${string}`
	|`/feed/trending?${string}`
	|`/hashtag/${string}`
	|"/hashtag/shorts/shorts"
	|`/reporthistory`
	|`/source/${string}/shorts`
	;
;
export type GU_VE11487_Url="/premium";
export type GU_VE23462_Url=
	|"/account_advanced"
	|"/account_billing"
	|"/account_notifications"
	|"/account_playback"
	|"/account_privacy"
	|"/account_sharing"
	|"/account"
	;
;
export type GU_VE23462_Id=
	|"SPaccount_advanced"
	|"SPaccount_billing"
	|"SPaccount_notifications"
	|"SPaccount_overview"
	|"SPaccount_playback"
	|"SPaccount_privacy"
	|"SPaccount_sharing"
	;
;
export type GU_VE37414_Url="/shorts/"|`/shorts/${string}`;
export type GU_VE42352_Url="/feed/downloads";
export type GU_VE83769_Url_Internal=
	|"/upload"
	|`https://youtube.com/${string}`
	;
;
export type GU_VE83769_Url=
	|GU_VE83769_Url_Internal
	|GU_VE83769_Url_Redirect
	|GU_VE83769_Url_External
	|`https://support.google.com/youtube/answer/${number}`
	|`https://myaccount.google.com/u/${number}/b/${bigint}/?${string}`
	;
;
export type GU_VE96368_Url="/feed/subscriptions";
export type ST_EncodedURIComponent=string&{type: "EncodedURIComponent";};
export type D_UrlInfoMap={
	["https://www.youtube.com/redirect"]: GU_YoutubeUrlRedirect_Info;
};
export type GU_YoutubeUrlRedirect_Info={
	url: `https://www.youtube.com/redirect?event=video_description&redir_token=${string}&q=${string}&v=${string}`,
	encoded_params: {q: ST_EncodedURIComponent;};
};
export type GU_YoutubeUrlRedirect_Event=
	|""
	|"channel_banner"
	|"endscreen"
	|"product_shelf"
	|"video_description"
	;
export type GU_VE83769_Url_Redirect=
	|`https://www.youtube.com/redirect?event=${GU_YoutubeUrlRedirect_Event}&redir_token=${string}&q=${string}&v=${string}`
	|`https://www.youtube.com/redirect?event=${GU_YoutubeUrlRedirect_Event}&redir_token=${string}&q=${string}`
	;
;
export type D_StrOnlyLen<T extends number,U extends string>=T_Split<U,"">['length'] extends T? U:never;
export type GU_VE83769_Url_External=
	|"https://music.youtube.com"
	|"https://music.youtube.com/"
	|"https://studio.youtube.com"
	|"https://studio.youtube.com/"
	|"https://studio.youtube.com/channel/UC/livestreaming"
	|"https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273"
	|"https://www.google.com/get/videoqualityreport/"
	|"https://www.youtubekids.com?source=youtube_web"
	|"https://www.youtubekids.com/?source=youtube_web"
	|`https://myactivity.google.com/activitycontrols/youtube?${string}`
	|`https://studio.youtube.com/channel/UC${D_StrOnlyLen<24,"AAAAAAAAAAAAAAAAAAAAAAAA">}/videos`
	|`https://studio.youtube.com/channel/UC${D_StrOnlyLen<24,"AAAAAAAAAAAAAAAAAAAAAAAA">}`
	|`https://www.googleadservices.com/pagead/aclk?${string}`
	|`https://googleads.g.doubleclick.net/aclk?sa=l&ai=${string}&ae=1&num=1&cid=${string}&sig=${string}&client=${string}&rf=3&adurl=${string}`
	|`https://googleads.g.doubleclick.net/aclk?adurl=${string}&rf=3&client=ca-pub-${number}&sig=${string}&cid=${string}&num=1&ae=1&ai=${string}&sa=l`
	;
;
export type GU_VE5754_Url=`/playlist?list=${"WL"|"LL"|T_IdTemplate<"PL">}`;
export type GU_VE3611_2=
	|`/@${string}/about`
	|`/@${string}/channels`
	|`/@${string}/featured`
	|`/@${string}/playlists`
	|`/@${string}/search?query=${string}`
	|`/@${string}/search`
	|`/@${string}/shorts`
	|`/@${string}/videos`
	|`/@${string}`
	|`/c/${string}`
	;
;
export type GU_VE3611_3=
	|`/@${string}/about`
	|`/@${string}/channels`
	|`/@${string}/community`
	|`/@${string}/playlists`
	|`/@${string}/search?query=${string}`
	|`/@${string}/shorts`
	|`/@${string}/videos`
	|`/@${string}`
	|`/channel/UC${string}`
	;
;
//#region Url Templates
export type GU_CaptionTrackItem_BaseUrl=`https://www.youtube.com/api/timedtext?v=${D_TimedTextApi["v"]}&caps=${D_TimedTextApi_Req["caps"]}&xoaf=${D_TimedTextApi["xoaf"]}&xoadf=${D_TimedTextApi_Req["xoadf"]}&xosf=${D_TimedTextApi_Req["xosf"]}&hl=${D_TimedTextApi["hl"]}&ip=${D_IpFormat}&ipbits=${D_TimedTextApi["ipbits"]}&expire=${D_TimedTextApi["expire"]}&sparams=${D_TimedTextApi["sparams"]}&signature=${D_TimedTextApi["signature"]}&key=${D_TimedTextApi["key"]}&kind=${D_TimedTextApi_Req["kind"]}&lang=${D_TimedTextApi["lang"]}`;
export type GU_RadioShareUrl=
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`
	|`https://www.youtube.com/playlist?list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RD${string}`
	;
;
export type GU_InitPlaybackUrl=`https://${GV_SubDomain}.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=55c84a1a739ba4f3&ip=${D_IpFormat}&initcwndbps=581250&mt=1677051923&oweuc=`;
export type D_IpFormat=`${number}.${number}.${number}.${number}`;
// ApiStatsAdsArgs
// spell:ignore trackclk aclk
export type GU_ExternalUrl=
	|GU_InitPlaybackUrl
	|`https://ad.doubleclick.net/ddm/trackclk/${string}`
	|`https://i.ytimg.com/vi/${string}/maxresdefault.jpg`
	|`https://music.youtube.com/`
	|`https://music.youtube.com`
	|`https://studio.youtube.com/`
	|`https://studio.youtube.com`
	|`https://support.google.com/youtube/answer/${number}`
	|`https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273`
	|`https://www.google.com/get/videoqualityreport/`
	|`https://www.googleadservices.com/pagead/aclk?${string}`
	|`https://www.gstatic.com/youtube/img/watch/yt_music_channel.jpeg`
	|`https://www.youtube.com/api/stats/ads?${string}`
	|`https://www.youtubekids.com/?source=youtube_web`
	|`https://www.youtubekids.com?source=youtube_web`
	|`https://yt${number}.ggpht.com/${string}=s88-c-k-c0x00ffffff-no-rj`
	;
;
export type D_GoodPut_ProbeUrl_SP=`id=${string}&source=${string}&range=${string}&expire=${number}&ip=${D_IpFormat}&ms=${string}&mm=${string}&pl=${string}&nh=${string}&sparams=${string}&signature=${D_TimedTextApi["signature"]}&key=${string}`;
export type GU_GoodPut_ProbeUrl=`https://${GV_SubDomain}.googlevideo.com/videogoodput?${D_GoodPut_ProbeUrl_SP}`;
export type D_VideoPlayback_SP=`expire=${number}&ei=${string}&ip=${D_IpFormat}&id=${string}&itag=${number}&aitags=${string}&source=youtube&requiressl=yes&mh=B2&mm=${string}&mn=${string}&ms=${string}&mv=m&mvi=3&pl=24&initcwndbps=${number}&spc=${string}&vprv=1&mime=${string}&ns=${string}&gir=yes&clen=${number}&dur=${number}&lmt=${number}&mt=${number}&fvip=4&keepalive=yes&fexp=24007246&c=WEB&txp=number&n=${string}&sparams=expire,ei,ip,id,itag,source,requiressl,vprv,mime,ns,cnr,ratebypass,dur,lmt&sig=${string}&lsparams=mh,mm,mn,ms,mv,mvi,pl,initcwndbps&lsig=${string}`;
export type GU_VideoPlaybackUrl=`https://${GV_SubDomain}.googlevideo.com/videoplayback?${D_VideoPlayback_SP}`;
export type D_FormatItem_SignatureCipher_SP=`s=${string}&sp=${"sig"}&url=https://${GV_SubDomain}.googlevideo.com/videoplayback%3Fexpire%3D${D_VPS_Req["expire"]}%26ei%3D${D_VPS_Req["ei"]}%26ip%3D${D_VPS_Req["ip"]}%26id%3D${D_VPS_Req["id"]}%26itag%3D${number}%26aitags%3D${string}%26source%3D${D_VPS_Req["source"]}%26requiressl%3D${D_VPS_Req["requiressl"]}%26mh%3D${D_VPS_Req["mh"]}%26mm%3D${D_VPS_Req["mm"]}%26mn%3D${D_VPS_Req["mn"]}%26ms%3D${D_VPS_Req["ms"]}%26mv%3D${D_VPS_Req["mv"]}%26mvi%3D${D_VPS_Req["mvi"]}%26pl%3D${D_VPS_Req["pl"]}%26initcwndbps%3D${D_VPS_Req["initcwndbps"]}%26spc%3D${D_VPS_Req["spc"]}%26vprv%3D${D_VPS_Req["vprv"]}%26mime%3D${D_VPS_Req["mime"]}%26ns%3D${D_VPS_Req["ns"]}%26gir%3D${D_VPS_Req["gir"]}%26clen%3D${D_VPS_Req["clen"]}%26dur%3D${D_VPS_Req["dur"]}%26lmt%3D${D_VPS_Req["lmt"]}%26mt%3D${D_VPS_Req["mt"]}%26fvip%3D${D_VPS_Req["fvip"]}%26keepalive%3D${D_VPS_Req["keepalive"]}%26fexp%3D${D_VPS_Req["fexp"]}%26c%3D${D_VPS_Req["c"]}%26txp%3D${D_VPS_Req["txp"]}%26n%3D${D_VPS_Req["n"]}%26sparams%3D${string}%26sig%3D${D_VPS_Req["sig"]}%26lsparams%3D${string}%26lsig%3D${D_VPS_Req["lsig"]}`;
//#endregion
//#region Url strings
export type GU_YTExternalUrl="https://m.youtube.com/premium";
export type GU_YtDomain="https://www.youtube.com";
//#endregion
//#region Extract on Url
export type GU_YoutubeUrl_1=Extract<DE_Url['url'],`${string}www.youtube.com${string}`>;
export type GU_YoutubeKidsUrl_1=Extract<DE_Url['url']|"https://www.youtubekids.com/?source=youtube_web",`https://www.youtubekids.com${string}`>;
//#endregion
//#region UrlShape objects
export type D_VideoPlaybackShape_S_Params={
	expire: `${T_UnixTime_In6Hours<number>}`;
	ei: string;
	ip: D_IpFormat;
	id: string;
	itag?: D_VideoPlayback_Itag;
	aitags?: "133,134,135,136,137,160,242,243,244,247,248,278,394,395,396,397,398,399";
	source: "youtube";
	requiressl: "yes";
	ctier?: "SH";
	gcr?: "ca";
	spc?: string;
	vprv: "1";
	ufph?: "1";
	live?: "1";
	hang?: "1";
	noclen?: "1";
	xtags?: "acont=dubbed:lang=es-MX";
	mime: "video/mp4";
	ns: string;
	cnr?: "14";
	gir?: "yes";
	clen?: `${number}`;
	ratebypass?: "yes";
	dur?: `${number}`;
	lmt: `${number}`;
};
//#endregion UrlShape objects
//#endregion GU

//#region GV
//#region used
// gen_2_raw
export type GV_gen_g2_t1<T>=["gen_2",["raw",T]];
// gen_3_arr
export type GV_gen_g3_t2<U,T extends any[]>=["gen_3",U,["arr",T]];
// gen_3_arr
export type GV_gen_g3_raw<T,U>=["gen_3",T,["raw",U]];
export type GV_gen_a2_t2<T,U extends [string,string]>=[["seq",T,U[0]],["seq",T,U[1]]];
export type GV_gen_a3_t2<T extends [string,string],U,V extends [string,string]>=[["seq",T[0],U,V[0]],["seq",T[1],U,V[1]]];
//#endregion
//#region unused
export type GV_gen_g3_t2t1<T,U extends any[]>=GV_gen_g3_t2<T,GV_gen_g3_t2<"n",U>>;
export type GV_gen_g3_or<T,U>=["gen_3",T,["or",U]];
export type GV_gen_g3_a3<T,U,V>=["gen_3",T,["gen2",U,V]];
export type GV_seq_t3<T,U,V>=["seq",T,U,V];
//#endregion
//#endregion GV

//#region GM
//#region WebCommandMetadata
//#region WebCommandMetadata Objects
export type GM_PostApiLike={sendPost: true; apiUrl: string;};
export type GM_SendPost={sendPost: true;};
export type GM_UserFeedback={ignoreNavigation: true;};
//#endregion
//#region GM_VE
export type GM_VE_WC_Browse=GE_Browse_WCM["webCommandMetadata"];
export type M_ResolveUrlCommand={
	parentTrackingParams?: string;
	isVanityUrl?: true;
};
//#endregion
//#region WebCommandMetadata like {rootVe:number;}
export type GM_VE3611={
	url: GU_VE3611_Url;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
	rootVe: 3611;
	apiUrl: "/youtubei/v1/browse";
};
export type GM_VE3832={
	url: `/watch?${string}`|`/playlist?list=RD${string}&playnext=1&index=${number}`;
	webPageType: "WEB_PAGE_TYPE_WATCH";
	rootVe: 3832;
};
export type GM_VE3854={
	url: "/";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 3854;
	apiUrl: "/youtubei/v1/browse";
};
export type GM_Search={
	url: D_ResultsPageUrl;
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};
export type GM_VE5754={
	url: GU_VE5754_Url;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
	rootVe: 5754;
	apiUrl: "/youtubei/v1/browse";
};
export type GM_VE6827={
	url?: GU_VE6827_Url;
	sendPost?: true;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 6827;
	apiUrl: "/youtubei/v1/browse";
};
export type GM_VE11487={
	url: GU_VE11487_Url;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 11487;
	apiUrl: "/youtubei/v1/browse";
};
export type GM_VE23462={
	url: GU_VE23462_Url;
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462;
	apiUrl: "/youtubei/v1/browse";
};
export type GM_VE37414={
	url: GU_VE37414_Url;
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
export type GM_VE42352={
	url: GU_VE42352_Url;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 42352;
	apiUrl: "/youtubei/v1/browse";
};
export type GM_Url={
	url: GU_VE83769_Url;
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
export type GM_VE96368={
	url: GU_VE96368_Url;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
//#endregion
//#region WebCommandMetadata with T_GM_PostApi_WithApiUrl
export type GM_AccountMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/account_menu">;
export type GM_AddToPlaylistService=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/get_add_to_playlist">;
export type GM_Browse=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse">;
export type GM_CreateBackstagePost=T_GM_PostApi_WithApiUrl<"/youtubei/v1/backstage/create_post">;
export type GM_CreateComment=T_GM_PostApi_WithApiUrl<"/youtubei/v1/comment/create_comment">;
export type GM_CreatePlaylist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/create">;
export type GM_Dislike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/dislike">;
export type GM_EditPlaylist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse/edit_playlist">;
export type GM_GetSettingsEditor=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/get_settings_editor">;
export type GM_Feedback=T_GM_PostApi_WithApiUrl<"/youtubei/v1/feedback">;
export type GM_FlagGetForm=T_GM_PostApi_WithApiUrl<"/youtubei/v1/flag/get_form">;
export type GM_GetNotificationMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_notification_menu">;
export type GM_GetPdgBuyFlow=T_GM_PostApi_WithApiUrl<"/youtubei/v1/pdg/get_pdg_buy_flow">;
export type GM_GetSharePanel=T_GM_PostApi_WithApiUrl<"/youtubei/v1/share/get_share_panel">;
export type GM_GetSurvey=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_survey">;
export type GM_GetTranscript=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_transcript">;
export type GM_GetUnseenNotificationCount=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_unseen_count">;
export type GM_GetWebPlayerSharePanel=T_GM_PostApi_WithApiUrl<"/youtubei/v1/share/get_web_player_share_panel">;
export type GM_Like=GM_LikeLike|GM_Dislike|GM_RemoveLike;
export type GM_LikeLike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/like">;
export type GM_Next=T_GM_PostApi_WithApiUrl<"/youtubei/v1/next">;
export type GM_NotificationOptOut=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/opt_out">;
export type GM_RecordInteractions=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/record_interactions">;
export type GM_RemoveLike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/removelike">;
export type GM_SetSetting=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/set_setting">;
export type GM_Subscribe=T_GM_PostApi_WithApiUrl<"/youtubei/v1/subscription/subscribe">;
export type GM_Unsubscribe=T_GM_PostApi_WithApiUrl<"/youtubei/v1/subscription/unsubscribe">;
export type GM_YpcGetOffers=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_offers">;
export type GM_YpcGetCart=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_cart">;
//#endregion
//#endregion
//#region GM_VE
export type GM_VE=
	|GM_Search
	|GM_Url
	|GM_VE3611
	|GM_VE3832
	|GM_VE3854
	|GM_VE5754
	|GM_VE6827
	|GM_VE11487
	|GM_VE12924
	|GM_VE23462
	|GM_VE37414
	|GM_VE42352
	|GM_VE96368
	;
;
export type D_GM_VeNum=GM_VE['rootVe'];
export type GM_PostApi=
	|GM_SetSetting
	|GM_AccountMenu
	|GM_CreateBackstagePost
	|GM_EditPlaylist
	|GM_Browse
	|GM_CreateComment
	|GM_Feedback
	|GM_FlagGetForm
	|GM_GetSurvey
	|GM_GetTranscript
	|GM_GetNotificationMenu
	|GM_Dislike
	|GM_LikeLike
	|GM_RemoveLike
	|GM_Next
	|GM_GetUnseenNotificationCount
	|GM_NotificationOptOut
	|GM_RecordInteractions
	|GM_CreatePlaylist
	|GM_AddToPlaylistService
	|GM_SendPost
	|GM_GetSharePanel
	|GM_Subscribe
	|GM_YpcGetOffers
	|GM_YpcGetCart
	;
;
//#endregion
//#endregion

//#region G_WRT
//#region Used by renderer
export type D_TwoColumnWatchNextResults={
	results: T_Results<G_Watch_ResultsItem>;
	secondaryResults: T_SecondaryResults<G_Watch_SecondaryResults>;
	playlist?: T_Playlist<D_PlaylistContent>;
	autoplay?: T_Autoplay<D_AutoplayContent>;
	conversationBar?: G_ConversationBar;
};
//#endregion
//#region Used by data
export type G_Watch_ResultsItem={trackingParams: string; contents: G_Watch_ContentsItem[];};
export type G_Watch_SecondaryResults=G_Watch_SecondaryResults_Contents|G_Watch_SecondaryResults_Results;
export type G_ConversationBar=R_LiveChat|R_ConversationBar;
//#endregion
//#region Watch Secondary
export type RG_Watch_ItemSection=TR_ItemSection_3<G_Watch_SecondaryResults_G_SectionItem,"sid-wn-chips","watch-next-feed">;
export type G_Watch_SecondaryResults_G_SectionItem=R_CompactPlaylist|R_CompactVideo|R_CompactRadio|R_AdSlot;
export type G_Watch_AnyResultItem=R_RelatedChipCloud|RG_Watch_ItemSection;
export type G_Watch_SecondaryResults_Results={trackingParams: string; results: G_Watch_AnyResultItem[]; continuations?: [];};
export type G_Watch_SecondaryResults_Contents={contents: G_Watch_AnyResultItem[];};
//#endregion
//#region Watch ContentsItem
export type G_Watch_ContentsItem=[
	TR_ItemSection_3<R_ContinuationItem,"comment-item-section","comments-section">,
	TR_ItemSection_2<R_CommentsEntryPointHeader,"comments-entry-point">,
	R_MerchandiseShelf,
	R_VideoPrimaryInfo,
	R_VideoSecondaryInfo,
][number];
//#endregion
//#region Data
export type D_AutoplayContent={
	sets: D_AutoplaySetItem[];
	countDownSecs?: 5;
	modifiedSets?: D_ModifiedSetItem[];
	trackingParams: string;
};
//#endregion
//#endregion G_WRT


//#region G_RS
export type G_RS_AllResponses=RS_WatchReelItem|RS_Channel|RS_Channel|RS_Browse|RS_Channel|R_Page;
export type G_RS_Subscribe_Action=A_AddToGuideSection|TA_OpenPopup_Empty|C_RunAttestation|AU_SubscribeButton;
export type G_RS_ShortsPage=RS_Page_Shorts|RS_VE37414_Shorts;
export type G_RS_SettingsPage=RS_Page_Settings|RS_VE23462_Page_Settings;
export type G_RS_WatchPage=RS_Page_Watch|RS_VE3832_Page_Watch;
//#endregion G_RS
