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
	"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"
][number];
namespace DE_Like_NS {
	export type DE_Like=DE_LikeIndifferent|DE_LikeLike|DE_LikeDislike;
	type DE_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
	type DE_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
	type DE_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
}
//#endregion
//#region Entity data
type DE_SuperThanksSelectedTier={
	key: string;
	index: number;
};
type DE_PersistenceOption={persistenceOption: "ENTITY_PERSISTENCE_OPTION_INMEMORY_AND_PERSIST";};
type DE_ShowEngagementPanel={panelIdentifier: "engagement-panel-searchable-transcript";};
type DE_GetReportForm=DC_Params;
type DE_GetTranscript=DC_Params;

