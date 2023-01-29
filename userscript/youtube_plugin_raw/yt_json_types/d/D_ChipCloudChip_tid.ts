type D_ChipCloudChip_tid={
	style: T_StyleType<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: D_Text;
	trackingParams: string;
	targetId: "feed_filter_chip_bar_second_chip";
}|{
	navigationEndpoint: C_Continuation|C_RelatedChip;
	targetId: "feed_filter_chip_bar_second_chip";
};