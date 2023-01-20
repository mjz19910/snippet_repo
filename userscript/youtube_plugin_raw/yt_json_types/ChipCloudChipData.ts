type ChipCloudChipData={
	style: ChipCloudStyle;
	text: TextT;
	navigationEndpoint?: ContinuationCommand|RelatedChipCommand;
	trackingParams: string;
	isSelected?: true;
};
