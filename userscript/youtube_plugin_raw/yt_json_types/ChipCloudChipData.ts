type ChipCloudChip_tid={
	style: ChipCloudStyle<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: TextT;
	navigationEndpoint?: C$Continuation|RelatedChipCommand;
	trackingParams: string;
	targetId: "feed_filter_chip_bar_second_chip";
};

type ChipCloudChip={
	style: ChipCloudStyle<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: TextT;
	navigationEndpoint?: C$Continuation|RelatedChipCommand;
	trackingParams: string;
	isSelected?: true;
	uniqueId?: "ATTRIBUTE_FILTER_TYPE_EXPLORE";
}|ChipCloudChip_tid;
