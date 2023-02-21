type GCF_s=
	|CF_RS_Page_Type1
	|CF_D_ChipCloudChip_Omit
	|CF_D_CustomEmoji
	|CF_D_GuideEntry
	|CF_D_Link
	|CF_D_Menu_Omit
	|CF_D_Params
	|CF_D_ToggleButton
	|CF_parse_identifier
	|CF_T_GM
	|CF_T_Icon
	|CF_T_Items_TP
	|CF_T_SE_Signal
	|CF_TA_OpenPopup
	|CF_TD_ItemSection
	|CF_TD_Params
	|Ret_get_auto_type_name
	;
;
type GCF_w=CF_T_Commands|CF_T_Signal|CF_M_y|CF_TR_MultiPageMenu|CF_T_Items|CF_T_Items_TP|CF_TA_Page;
type pt_xt=(R_FancyDismissibleDialog|{}) extends infer T? T extends infer U? {} extends U? never:U:never:never;