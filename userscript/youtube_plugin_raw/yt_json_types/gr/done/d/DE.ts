//#region String Enum
type DE_AdPlacementKind=T_EnumStr<"AD_PLACEMENT_KIND",[
	"END",
	"SELF_START",
	"START"
][number]>;
type DE_OpportunityType=T_EnumStr<"OPPORTUNITY_TYPE",T_EnumStr<"ORGANIC",T_EnumStr<[
	"BROWSE",
	"WATCH_NEXT",
][number],"RESPONSE_RECEIVED">>>;
type DE_IconType_Button=[
	"SETTINGS"|"DELETE",
	"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF",
	"CHEVRON_RIGHT","CHEVRON_LEFT","REMOVE","INFO","CLOSE","MICROPHONE_ON",
][number];
//#endregion
//#region Entity data
