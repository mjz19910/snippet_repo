type D_CF=import("./D_CF_mod.js").D_CF;
type D_CF_w=[
	`y:${D_CF_y}`,
	`zy:${D_CF_zy}`,
	`Unpack:T_WCM:${D_CF["Unpack"]["T_WCM"]}`,
	`TA_Page:${D_CF_TA_Page}`,
	`TR_MultiPageMenu:${D_CF_TR_MultiPageMenu}`,
	`G_EY_Entity_Any:G_EY_Entity`,
][number];
type D_CF_TR_MultiPageMenu=[
	"D_NotificationMenu_PopupItemMenu",
][number];
type D_CF_y=[
	`T_WCM:${D_CF_T_WCM}`,
	"DE_CreateBackstagePost",
	"T_Item",
	"B_HrefUrl",
	"D_YpcGetCart",
][number];
type D_CF_zy=[
	"T_Item",
][number];
type D_CF_Unpack_T_WCM=[
	"D_CF_Unpack_T_WCM",
	"MG_Survey_CMD",
][number];
type D_CF_TA_Page=[
	"AD_UpdateChannelSwitcherPage",
][number];
