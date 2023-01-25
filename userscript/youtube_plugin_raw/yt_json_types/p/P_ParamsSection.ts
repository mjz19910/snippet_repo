type P_ParamsSection=
	|"A_HideEngagementPanelScrim"
	|"AE_Browse"
	|"C_AdsControlFlowOpportunityReceived"
	|"C_Executor"
	|"C_ReloadContinuationItems"
	|"C_ScrollToEngagementPanel"
	|"C_ShowReloadUi"
	|"CommonConfigData"
	|"CreatePlaylist"
	|"D_AdLayoutLogging"
	|"D_AutoplayContent"
	|"D_AutoplaySwitchButton"
	|"D_ChipCloud"
	|"D_CommonConfig"
	|"D_CompactVideo"
	|"D_DesktopTopbar"
	|"D_EntityMutationItem"
	|"D_FeaturedChannel"
	|"D_FeedFilterChipBar"
	|"D_FusionSearchbox"
	|"D_GuideSection"
	|"D_HotkeyDialog"
	|"D_ItemSection_2_CommentItemSection"
	|"D_LoggingDirectives"
	|"D_Menu"
	|"D_MenuNavigationItem"
	|"D_MenuServiceItem"
	|"D_MusicThumbnail"
	|"D_Notification"
	|"D_PdgBuyFlow"
	|"D_PlayerOverlayAutoplay"
	|"D_PlaylistContent"
	|"D_PlaylistEdit"
	|"D_PlaylistSidebar"
	|"D_ReelWatch"
	|"D_RichGrid"
	|"D_RichItem"
	|"D_SearchFeedSectionList"
	|"D_SerializedSlotAdServingDataEntry"
	|"D_SubscribeButton"
	|"D_SuperVodBuyFlowContent"
	|"D_TemplateUpdate"
	|"D_Video"
	|"D_WatchNextEndScreen"
	|"D_WatchResult_ResultsItem"
	|"D_YpcGetCart"
	|"DE_GetNotificationMenu"
	|"DMD_Badge"
	|"E_CreateBackstagePost"
	|"E_CreateBackstagePost"
	|"E_Feedback"
	|"E_GetTranscript"
	|"E_PlaylistEdit"
	|"E_ReelWatch"
	|"E_Search"
	|"E_SetSettingAutonavForDesktop"
	|"E_ShareEntityService"
	|"E_YpcGetOffers"
	|"EA_ChangeEngagementPanelVisibility"
	|"G_SectionList"
	|"GeneratedWCM"
	|"Generic_WatchPageResponse"
	|"GetReportForm"
	|"GetTranscript"
	|"GM_WC"
	|"HrefUrl"
	|"MC_ResolveUrl"
	|"MP_MenuNotificationSection"
	|"Next"
	|"openPopupAction"
	|"PlaylistContent"
	|"PlaylistEdit"
	|"RecordNotificationInteractions"
	|"ReelWatch"
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
	|"RSB_EditPlaylist"
	|"RSG_NotificationMenu"
	|"RSG_PdgBuyFlow"
	|"RSG_SearchSuggestions"
	|"RSG_Survey"
	|"RSG_Transcript"
	|"SubscribeEndpoint"
	|"T_Command_TP"
	|"TA_OpenPopup"
	|"Tab"
	|"TD_ItemSection_1_CommentsEntryPoint"
	|"TD_ItemSection_3"
	|"TopbarLogo"
	|"UA_EngagementPanel"
	|"UA_NotificationsUnseenCount"
	|"UnknownWebCommandMetadata"
	|"WatchEndpoint"
	|"WatchPageResponse"
	|"WatchPlaylist"
	|"WatchResponse"
	|"YpcGetOffers"
	|`${T_Endpoint_CF}.endpoint`
	|D_Button_CF
	|D_Link_CF
	|GE_ResponseReceived_CF
	|Omit_Menu_Radio_CF
	|T_Endpoint_CF
	|D_ChipCloudChip_Omit_CF
	;
;
type T_Endpoint_CF=[
	"E_CreateBackstagePost",
	"C_Continuation",
	"C_GetSurvey",
	"E_Browse",
	"E_YpcGetCart",
	"E_ReelWatch",
	"E_RecordNotificationInteractions",
	"E_GetNotificationMenu",
	"E_WatchPlaylist",
][number];
type D_Link_CF=[
	"D_CompactLink",
][number];
type D_Button_CF=[
	"D_Button",
	`D_Button.${"Mixed"|"Styled"|"WithAccessibility"}`,
][number];
type GE_ResponseReceived_CF=[
	"RS_Watch",
	"RS_Next",
][number];
type Omit_Menu_Radio_CF=[
	"D_PlayerOverlayAutoplay",
	"D_Radio",
	"D_Video",
	"D_CompactVideo",
][number];
type D_ChipCloudChip_Omit_CF=[
	"D_ChipCloudChip",
][number];
function vv_x(u: keyof import("../../youtube_plugin.user.js").HandleTypes) {
	switch(u) {
		case "log_url":
		case "YTNavigateFinishDetail":
		case "ResponseTypes":
		case "_current_response_type":
		case "sd":
		case "k":
		case "_decoder":
		case "D_MP_Menu":
		case "get_res_data":
		case "use_template_url":
		case "valid_fps_arr":
		case "format_quality_arr":
		case "parse_with_url_parse":
		case "_use":
		case "_decode_b64_url_proto_obj":
		case "TODO_true":
		case "save_keys":
		case "ds":
		case "x":
		case "parser":
		case "codegen":
		case "save_string_api":
		case "log_skipped_strings":
		case "get_name_from_keys":
		case "get_keys_of":
	}
}
vv_x("D_MP_Menu");