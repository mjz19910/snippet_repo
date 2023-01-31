type D_CF=import("./D_CF_mod.js").D_CF;
type D_CF_w=[
	`y:${D_CF_y}`,
	`zy:${D_CF_zy}`,
	`Unpack:T_WCM:${D_CF["Unpack"]["T_WCM"]}`,
	`TA_Page:${TA_Page_CF}`,
	`TR_MultiPageMenu:${TR_MultiPageMenu_CF}`,
	`G_EY_Entity_Any:G_EY_Entity`,
	`T_Items:${T_Items_CF}`,
	"D_ImpressionCap",
][number];
type T_Items_CF=[
	"R_CompactLink_Items",
	"D_ProfileColumn",
][number];
type D_CF_y=[
	D_CF_y_str,
	`T_WCM:${T_WCM_CF}`,
][number];
type D_CF_zy=[
	"T_Item",
	"D_ChannelHeaderLinks",
][number];
type T_WCM_CF_Unpack=[
	"MG_Survey_CMD",
][number];
type TA_Page_CF=[
	"AD_UpdateChannelSwitcherPage",
][number];
