type D_CF=import("./D_CF_mod.js").D_CF;
type D_CF_w=[
	`y:${D_CF_y}`,
	`zy:${D_CF_zy}`,
	`Unpack:T_WCM:${D_CF["Unpack"]["T_WCM"]}`,
	`TA_Page:${TA_Page_CF}`,
	`TR_MultiPageMenu:${TR_MultiPageMenu_CF}`,
	`G_EY_Entity_Any:G_EY_Entity`,
][number];
type TR_MultiPageMenu_CF=[
	"D_NotificationMenu_PopupItemMenu",
][number];
type D_CF_y=[
	`T_WCM:${T_WCM_CF}`,
	"DE_CreateBackstagePost",
	"T_Item",
	"B_HrefUrl",
	"D_YpcGetCart",
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
