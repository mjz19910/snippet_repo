type D_ChipCloudChip={
	style: TS_ChipCloud<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: G_Text;
	navigationEndpoint?: C_Continuation|RC_RelatedChip;
	trackingParams: string;
	isSelected?: true;
	uniqueId?: "ATTRIBUTE_FILTER_TYPE_EXPLORE";
};