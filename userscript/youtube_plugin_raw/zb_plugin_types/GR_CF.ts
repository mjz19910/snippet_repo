type CF_L_Params=
	CF_L_CTP_Params|
	CF_L_TP_Params
	// TODO
	|"D_TemplateUpdate"
	|"DE_GetTranscript"
	;
;

type CF_mod=import("./D_CF_mod.js").D_CF_mod;
type CF_M_s_priv=
	|`D_Params:${CF_D_Params}`
	|`T_Endpoint_Tracking:${"C_GetSurvey"}`
	|`TD_ItemSection_3:${CF_TD_ItemSection_3}`
	|`TE_Endpoint_2:${CF_TE_Endpoint_2}`
	|`TE_Endpoint_3:${CF_TE_Endpoint_3}`
	|`TE_Endpoint_Opt_3:${CF_TE_Endpoint_Opt_3}`
	|`T_Icon:${CF_T_Icon}`
	|`T_Icon:any:${CF_T_Icon_Any}`
	|`TA_OpenPopup:${CF_TA_OpenPopup}`
	;
;
type CF_TA_OpenPopup=T_ExtractImport<"CF_TA_OpenPopup">;
type CF_T_Icon_Any=T_ExtractImport<"CF_T_Icon_Any">;
type CF_A_MG_s=T_ExtractImport<"CF_M_s">;
type CF_M_s=
	|CF_A_MG_s
	|CF_D_Button
	|CF_D_Link
	|CF_D_Video_Handle
	|CF_D_Menu_Omit
	|CF_T_SE_Signal
	;
;
type CF_D_CustomEmoji=T_ExtractImport<"CF_D_CustomEmoji">;
type CF_D_Params=T_ExtractImport<"CF_D_Params">;
type CF_TE_Endpoint_2=T_ExtractImport<"CF_TE_Endpoint_2">;
type CF_TE_Endpoint_3=T_ExtractImport<"CF_TE_Endpoint_3">;
type CF_TD_ItemSection_3=T_ExtractImport<"CF_TD_ItemSection_3">;
type CF_T_WCM_Unpack=T_ExtractImport<"CF_T_WCM_Unpack">;
type CF_M_w=
	|`y:${CF_M_y}`
	|`zy:${CF_M_zy}`
	|`Unpack:T_WCM:${CF_T_WCM_Unpack}`
	|`TA_Page:${CF_TA_Page}`
	|`TR_MultiPageMenu:${CF_TR_MultiPageMenu}`
	|`G_EY_Entity_Any:G_EY_Entity`
	|`T_Items:${CF_T_Items}`
	|"D_ImpressionCap"
	;
;
type CF_T_Items=T_ExtractImport<"CF_T_Items">;
type CF_M_y=
	|T_ExtractImport<"CF_M_y">
	|`T_WCM:${CF_T_WCM}`
	;
;
type CF_M_zy=T_ExtractImport<"CF_M_zy">;
type CF_TA_Page=T_ExtractImport<"CF_TA_Page">;
type CF_T_Icon=T_ExtractImport<"CF_T_Icon">;
type CF_D_Video_Handle=T_ExtractImport<"CF_D_Video_Handle">;
type CF_T_SE_Signal_P1=T_ExtractImport<"CF_T_SE_Signal_P1">;
type CF_T_SE_Signal=
	|`${CF_GE_ResponseReceived}.SE_Signal`
	|`${CF_T_SE_Signal_P1}.SE_Signal`
	|T_ExtractImport<"CF_T_SE_Signal">
	;
;
type CF_L_TP_Params=
	T_ExtractImport<"CF_L_TP_Params">
	|`${CF_TE_Endpoint_2}.endpoint`
	|`${CF_TE_Endpoint_3}.endpoint`
	|`${CF_TE_Endpoint_Opt_3}.endpoint`
	|CF_D_Link
	|CF_D_Button
	|CF_D_Menu_Omit
	|`T_SE_Signal:${CF_T_SE_Signal}`
	;
;
type CF_L_CTP_Params=
	|T_ExtractImport<"CF_L_CTP_Params">
	|DC_Generic_CTP_CF
	;
;
type CF_D_Link=T_ExtractImport<"CF_D_Link">;
type CF_D_Button=T_ExtractImport<"CF_D_Button">;
type CF_GE_ResponseReceived=T_ExtractImport<"CF_GE_ResponseReceived">;
type CF_D_Menu_Omit=
	T_ExtractImport<"CF_D_Menu_Omit">
	|CF_D_Video_Handle
	;
;
type CF_D_ChipCloudChip_Omit=T_ExtractImport<"CF_D_ChipCloudChip_Omit">;
type CF_D_Playlist_Omit=T_ExtractImport<"CF_D_Playlist_Omit">;
type CF_TE_Endpoint_Opt_3=T_ExtractImport<"CF_TE_Endpoint_Opt_3">;
type CF_T_Endpoint=T_ExtractImport<"CF_T_Endpoint">;
type CF_M_VE=T_ExtractImport<"CF_M_VE">;
type CF_T_WCM=T_ExtractImport<"CF_T_WCM">;
