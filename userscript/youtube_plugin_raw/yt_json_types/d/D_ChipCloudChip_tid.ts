type D_ChipCloudChip_tid={
	style: TS_ChipCloud<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: G_Text;
	trackingParams: string;
	targetId: "feed_filter_chip_bar_second_chip";
}|{
	navigationEndpoint: C_Continuation|RC_RelatedChip;
	targetId: "feed_filter_chip_bar_second_chip";
};