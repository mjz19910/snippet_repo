type D_CF=import("./D_CF_mod.js").D_CF;
type D_CF_w=[
	`y:${D_CF_y}`,
	`zy:${D_CF_zy}`,
	`Unpack:T_WCM:${D_CF["Unpack"]["T_WCM"]}`,
	`TA_Page:${TA_Page_CF}`,
	`TR_MultiPageMenu:${TR_MultiPageMenu_CF}`,
	`G_EY_Entity_Any:G_EY_Entity`,
	`T_Items:${T_Items_CF}`,
][number];
type T_Items_CF=[
	"R_CompactLink_Items",
	"D_ProfileColumn",
][number];
type TR_MultiPageMenu_CF=[
	"D_NotificationMenu_PopupItemMenu",
	"TR_MultiPageMenu_Empty",
	"P_NotificationMenu_Popup",
	"R_TopbarMenu",
][number];
type D_CF_y=[
	"AD_HideEnclosing",
	"B_HrefUrl",
	"D_RelatedChipCloud",
	"D_YpcGetCart",
	"DE_CreateBackstagePost",
	"T_Item",
	`T_WCM:${T_WCM_CF}`,
][number];
type D_CF_zy=[
	"T_Item",
][number];
type T_WCM_CF_Unpack=[
	"MG_Survey_CMD",
][number];
type TA_Page_CF=[
	"AD_UpdateChannelSwitcherPage",
][number];
