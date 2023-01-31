type D_CF=import("./D_CF_mod.js").D_CF;
type DF_Sub_s=`D_CF_D_Params:${string}`;
type D_CF_s=[
][number];
type D_CF_D_Params=
	|"DE_GetReportForm"
	|"DE_GetTranscript"
	|"DE_YpcGetOffers"
	;
;
type D_CF_w=
	|`y:${D_CF_y}`
	|`zy:${D_CF_zy}`
	|`Unpack:T_WCM:${D_CF["Unpack"]["T_WCM"]}`
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
	|"D_NotificationTopbarButton"
	|"D_Button_SE"
	|"GC_Button"
	|"D_TopbarMenuButton"
	|"D_NotificationTopbarButton"
	|"D_NotificationTopbarButton.updateUnseenCount"
	;
;
type CF_T_SE_Signal=
	|`${D_CF_GE_ResponseReceived}.SE_Signal`
	|`${CF_T_SE_Signal_P1}.SE_Signal`
	;
;
