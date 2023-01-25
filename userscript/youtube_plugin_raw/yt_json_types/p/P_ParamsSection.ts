type Omit_Menu_Radio_CF=[
	"D_PlayerOverlayAutoplay",
	"D_Radio",
][number];
type P_ParamsSection=
	|"A_HideEngagementPanelScrim"
	|"AE_Browse"
	|"C_AdsControlFlowOpportunityReceived"
	|"C_Executor"
	|"C_ReloadContinuationItems"
	|"C_ScrollToEngagementPanel"
	|"CommonConfigData"
	|"CreatePlaylist"
	|"D_AutoplaySwitchButton"
	|"D_CommonConfig"
	|"D_CompactVideo"
	|"D_DesktopTopbar"
	|"D_FeaturedChannel"
	|"D_ItemSection_2_CommentItemSection"
	|"D_Menu"
	|"D_MenuNavigationItem"
	|"D_MenuServiceItem"
	|"D_Notification"
	|"D_PdgBuyFlow"
	|"D_PlayerOverlayAutoplay"
	|"D_PlaylistEdit"
	|"D_PlaylistSidebar"
	|"D_ReelWatch"
	|"D_RichGrid"
	|"D_RichItem"
	|"D_SubscribeButton"
	|"D_SuperVodBuyFlowContent"
	|"D_TemplateUpdate"
	|"D_Video"
	|"D_WatchNextEndScreen"
	|"D_WatchResult_ResultsItem"
	|"D_YpcGetCart"
	|"DE_GetNotificationMenu"
	|"E_CreateBackstagePost"
	|"E_CreateBackstagePost"
	|"E_Feedback"
	|"E_PlaylistEdit"
	|"E_ReelWatch"
	|"E_SetSettingAutonavForDesktop"
	|"E_ShareEntityService"
	|"GeneratedWCM"
	|"Generic_WatchPageResponse"
	|"GetReportForm"
	|"GetTranscript"
	|"GM_WC"
	|"HrefUrl"
	|"MC_ResolveUrl"
	|"Next"
	|"openPopupAction"
	|"PlaylistContent"
	|"PlaylistEdit"
	|"RecordNotificationInteractions"
	|"ReelWatch"
	|"RS_AccountMenu"
	|"RS_Browse"
	|"RS_Channel"
	|"RS_GetLiveChat"
	|"RS_Next"
	|"RS_Playlist"
	|"RS_ReelWatchSequence"
	|"RS_Search"
	|"RS_Settings"
	|"RSB_EditPlaylist"
	|"RSG_NotificationMenu"
	|"RSG_PdgBuyFlow"
	|"RSG_SearchSuggestions"
	|"RSG_Survey"
	|"SubscribeEndpoint"
	|"T_Command_TP"
	|"TA_OpenPopup"
	|"Tab"
	|"TD_ItemSection_1_CommentsEntryPoint"
	|"TD_ItemSection_3"
	|"TopbarLogo"
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
	;
;
type T_Endpoint_CF=[
	"Base",
	"C_Continuation",
	"C_GetSurvey",
	"E_Browse",
	"E_YpcGetCart",
	"E_ReelWatch",
][number];
type D_Link_CF=[
	"D_CompactLink",
][number];
type D_Button_CF=[
	"D_Button",
	`D_Button.${"Mixed"|"Styled"|"WithAccessibility"}`,
][number];
type GE_ResponseReceived_CF=[
	"Base",
	"RS_Watch",
	"RS_Next",
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
		case "R_RelatedClipCloud":
		case "D_MP_Menu":
		case "SectionListData":
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