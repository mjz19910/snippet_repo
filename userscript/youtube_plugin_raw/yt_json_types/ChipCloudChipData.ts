type ChipCloudChipData={
	style: ChipCloudStyle<"STYLE_DEFAULT"|"STYLE_HOME_FILTER">;
	text: TextT;
	navigationEndpoint?: ContinuationCommand|RelatedChipCommand;
	trackingParams: string;
	isSelected?: true;
	targetId?: "feed_filter_chip_bar_second_chip";
};
