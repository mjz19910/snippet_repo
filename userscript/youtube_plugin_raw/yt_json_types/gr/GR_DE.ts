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
namespace DE_Like_NS {
	export type DE_Like=DE_LikeIndifferent|DE_LikeLike|DE_LikeDislike;
	type DE_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
	type DE_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
	type DE_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
}
//#endregion
