type D_CF=import("./D_CF_mod.js").D_CF;
type D_CF_w=[
	`D_CF:y:${D_CF_y}`,
	`D_CF:zy:${D_CF_zy}`,
	`D_CF:Unpack:T_WCM:${D_CF["Unpack"]["T_WCM"]}`,
	`D_CF:TA_Page:${D_CF_TA_Page}`,
	`D_CF:Fix:${D_CF_Fix}`,
	`D_CF:TR_MultiPageMenu:${D_CF_TR_MultiPageMenu}`,
	`G_EY_Entity_Any:G_EY_Entity`,
][number];
type D_CF_TR_MultiPageMenu=[
	"D_NotificationMenu_PopupItemMenu",
][number];
type D_CF_y=[
	`D_CF:T_WCM:${D_CF_T_WCM}`,
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
type D_CF_Fix=[
	"TR_MultiPageMenu",
][number];
type D_CF_TA_Page=[
	"AD_UpdateChannelSwitcherPage",
][number];
