type P_ParamsSection=
	|"A_HideEngagementPanelScrim"
	|"AE_Browse"
	|"C_AdsControlFlowOpportunityReceived"
	|"C_Executor"
	|"CommonConfigData"
	|"CreatePlaylist"
	|"D_CompactVideo"
	|"D_DesktopTopbar"
	|"D_FeaturedChannel"
	|"D_Notification"
	|"D_PdgBuyFlow"
	|"D_PlaylistSidebar"
	|"D_ReelWatch"
	|"D_RichGrid"
	|"D_RichItem"
	|"D_TemplateUpdate"
	|"D_Video"
	|"DE_GetNotificationMenu"
	|"E_CreateBackstagePost"
	|"E_CreateBackstagePost"
	|"E_ReelWatch"
	|"E_ShareEntityService"
	|"GeneratedWCM"
	|"Generic_WatchPageResponse"
	|"GetReportForm"
	|"GetTranscript"
	|"GM_WC"
	|"HrefUrl"
	|"Next"
	|"PlaylistContent"
	|"PlaylistEdit"
	|"RecordNotificationInteractions"
	|"ReelWatch"
	|"RS_Browse"
	|"RS_Channel"
	|"RS_GetLiveChat"
	|"RS_Playlist"
	|"RS_ReelWatchSequence"
	|"RS_Settings"
	|"RSB_EditPlaylist"
	|"RSG_NotificationMenu"
	|"RSG_SearchSuggestions"
	|"SubscribeEndpoint"
	|"T_Command_TP"
	|"Tab"
	|"TD_ItemSection_3"
	|"D_SuperVodBuyFlowContent"
	|"D_YpcGetCart"
	|"MC_ResolveUrl"
	|"RS_AccountMenu"
	|"RS_Search"
	|"RSG_PdgBuyFlow"
	|"RSG_Survey"
	|"TA_OpenPopup"
	|"TD_ItemSection_1_CommentsEntryPoint"
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
	;
;
type T_Endpoint_CF=[
	"Base",
	"C_Continuation",
	"C_GetSurvey",
	"E_Browse",
	"E_YpcGetCart",
][number];
type D_Link_CF=[
	"D_CompactLink",
][number];
type D_Button_CF=[
	"D_Button",
	`D_Button.${"Mixed"|"Styled"|"WithAccessibility"}`,
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
		case "TR_ItemSection_3_CommentItemSection":
		case "TD_ItemSection_3_CommentItemSection":
		case "E_Url":
		case "R_ItemSection":
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