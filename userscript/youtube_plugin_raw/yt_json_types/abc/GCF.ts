type GCF_s=
	|CF_D_ChipCloudChip_Omit
	|CF_D_CustomEmoji
	|CF_D_GuideEntry
	|CF_D_Link
	|CF_D_Menu_Omit
	|CF_D_Params
	|CF_D_ToggleButton
	|CF_parse_identifier
	|CF_RS_Page_Type1
	|CF_T_GM
	|CF_T_Icon
	|CF_T_Items_TP
	|CF_T_OpenPopup_Dialog
	|CF_T_SE_Signal
	|CF_T_WCM
	|CF_TA_OpenPopup
	|CF_TD_ItemSection
	|CF_TD_Params
	|CF_TE_Endpoint_2
	|CF_TE_Endpoint_3
	|CF_TE_TrackedObj_2
	|Ret_get_auto_type_name
	;
;
type GCF_w=
	|CF_M_y
	|CF_M_zy
	|CF_T_Commands
	|CF_T_Items
	|CF_T_Items_TP
	|CF_T_Signal
	|CF_TA_Page
	|CF_TR_MultiPageMenu
	;
;
type pt_xt=(R_FancyDismissibleDialog|{}) extends infer T? T extends infer U? {} extends U? never:U:never:never;