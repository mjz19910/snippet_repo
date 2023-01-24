type D_ChipCloudChip$Style=[
	"STYLE_DEFAULT",
	"STYLE_HOME_FILTER",
	"STYLE_REFRESH_TO_NOVEL_CHIP",
][number];
type D_ChipCloudChip=|{
	style: TS_ChipCloud<D_ChipCloudChip$Style>;
	text: R_TextWithRuns;
	navigationEndpoint: C_Continuation;
	trackingParams: string;
}|{
	style: TS_ChipCloud<D_ChipCloudChip$Style>;
	text: R_TextWithRuns;
	trackingParams: string;
	isSelected: true;
}|{
	style: TS_ChipCloud<D_ChipCloudChip$Style>;
	text: R_TextWithRuns;
	navigationEndpoint: C_Continuation;
	trackingParams: string;
	targetId: "feed_filter_chip_bar_second_chip";
};
type D_TT={
	style: TS_ChipCloud<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: G_Text;
	trackingParams: string;
	uniqueId: "ATTRIBUTE_FILTER_TYPE_EXPLORE";
}|{
	style: TS_ChipCloud<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: G_Text;
	trackingParams: string;
	uniqueId: "ATTRIBUTE_FILTER_TYPE_EXPLORE";
	isSelected: true;
}|{
	style: TS_ChipCloud<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: G_Text;
	navigationEndpoint: C_Continuation|RC_RelatedChip;
	trackingParams: string;
};