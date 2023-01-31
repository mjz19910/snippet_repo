type CF_mod=import("./D_CF_mod.js").D_CF_mod;
type CF_T_Endpoint_3=""|"a";
type CF_M_s_priv=
	|`D_Params:${CF_D_Params}`
	|`T_Endpoint_Tracking:${"C_GetSurvey"}`
	|`TD_ItemSection_3:${CF_TD_ItemSection_3}`
	|`TE_Endpoint_2:${CF_TE_Endpoint_2}`
	|`TE_Endpoint_3:${CF_TE_Endpoint_3}`
	|`TE_Endpoint_Opt_3:${CF_TE_Endpoint_Opt_3}`
	|`T_Icon:${D_CF_T_Icon}`
	|`T_Icon:any:${CF_T_Icon_Any}`
	|`TA_OpenPopup:${CF_TA_OpenPopup}`
	;
;
type CF_TA_OpenPopup=
	Extract<import("../zd_gen_CF/out.js").Gen.CF_Generated,{n: "CF_TA_OpenPopup";}>['v']
	|"TA_OpenPopup_Empty"
	|"G_Action_GetNotificationsMenu"
	|""
	;
;
type CF_T_Icon_Any=
	|"D_Icon_Button"
	|""
	|"a"
	;
;
type CF_M_s=
	|Extract<import("../zd_gen_CF/gen_export_out.js").Gen.CF_Generated,{n: "CF_M_s";}>['v']
	|D_CF_D_Button
	|D_CF_D_Link
	;
;
type CF_D_Params=
	|"DE_GetReportForm"
	|"DE_GetTranscript"
	|"DE_YpcGetOffers"
	;
;
type CF_TE_Endpoint_2=Extract<import("../zd_gen_CF/gen_export_out.js").Gen.CF_Generated,{n: "CF_TE_Endpoint_2";}>['v']|"CF_TE_Endpoint_2"|""
	|"C_RefreshPlaylist"
	|"a"
	;
;
type CF_TE_Endpoint_3=Extract<import("../zd_gen_CF/gen_export_out.js").Gen.CF_Generated,{n: "CF_TE_Endpoint_3";}>['v']|"CF_TE_Endpoint_3"|""
	|""
	|"a"
	;
;
type CF_TD_ItemSection_3=
	|""
	|"a"
	;
;
type CF_T_WCM_Unpack=
	|"D_CF_Unpack_T_WCM"
	|"MG_Survey_CMD"
	;
;
type D_CF_w=
	|`y:${D_CF_y}`
	|`zy:${D_CF_zy}`
	|`Unpack:T_WCM:${CF_T_WCM_Unpack}`
	|`TA_Page:${TA_Page_CF}`
	|`TR_MultiPageMenu:${TR_MultiPageMenu_CF}`
	|`G_EY_Entity_Any:G_EY_Entity`
	|`T_Items:${T_Items_CF}`
	|"D_ImpressionCap"
	;
;
type T_Items_CF=
	|"R_CompactLink_Items"
	|"D_ProfileColumn"
	;
;
type D_CF_y=
	|D_CF_y_str
	|`T_WCM:${T_WCM_CF}`
	;
;
type D_CF_zy=
	|"T_Item"
	|"D_ChannelHeaderLinks"
	;
;
type T_WCM_CF_Unpack="MG_Survey_CMD";
type TA_Page_CF="AD_UpdateChannelSwitcherPage";
type D_CF_T_Icon=
	|"DMD_Badge_VerifiedArtist"
	|"DMD_Badge_Verified"
	|"DMD_Badge_LiveNow"
	|"D_Guide_ExpandIcon"
	|"D_Guide_CollapseIcon"
	|"D_Icon_YoutubeLogo"
	|"D_Icon_Search"
	|"D_Icon_Mix"
	|"D_Icon_Check"
	|"D_Icon_WatchLater"
	|"D_Icon:PLAYLIST_ADD_CHECK"
	|"D_Icon:ADD_TO_QUEUE_TAIL"
	;
;
type D_CF_D_Video_Handle=
	|"D_Video_Accessibility"
	|"D_Video_Other"
	|"D_Video_Owner"
	|"D_Video_videoId_2"
	|"D_Video_videoId_3"
	|"D_Video_videoId"
	;
;
type CF_T_SE_Signal_P1=
	|"D_GuideEntry"
	|"D_Button_SE"
	|"GC_Button"
	|"D_TopbarMenuButton"
	;
;
type CF_T_SE_Signal=
	|`${D_CF_GE_ResponseReceived}.SE_Signal`
	|`${CF_T_SE_Signal_P1}.SE_Signal`
	|`D_NotificationTopbarButton.${"menuRequest"|"U_UnseenCount"}.T_SE_Signal`
	;
;
type CF_L_Params=
	Extract<import("../zd_gen_CF/gen_export_out.js").Gen.CF_Generated,{n: "D_CF_L_Params";}>['v']|"D_CF_L_Params"|""
	|D_CF_L_Params_ext
	;
;
type D_CF_L_Params_ext=
	|`${CF_TE_Endpoint_Opt_3}.endpoint`
	|"C_GetSurvey.endpoint"
	|D_CF_D_Button
	|D_CF_D_ChipCloudChip_Omit
	|D_CF_D_Link
	|D_CF_GE_ResponseReceived
	|D_CF_Omit_Menu_Radio
	|CF_TE_Endpoint_Opt_3
	|CF_D_Params
	|`${CF_TE_Endpoint_2}.endpoint`
	|`${CF_TE_Endpoint_3}.endpoint`
	|`T_SE_Signal:${CF_T_SE_Signal}`
	;
;
type D_CF_D_Link=
	|"D_CompactLink"
	|"D_CompactLink.Styled"
	;
;
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
	|"D_Video"
	|D_CF_D_Video_Handle
	|D_CF_D_Playlist_Omit;
type D_CF_D_ChipCloudChip_Omit="D_ChipCloudChip";
type D_CF_D_Playlist_Omit="D_Playlist"|"D_CompactPlaylist";
type CF_TE_Endpoint_Opt_3=|""|"a";
type CF_T_Endpoint=|""|"a";