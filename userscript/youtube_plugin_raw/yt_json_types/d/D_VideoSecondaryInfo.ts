type D_VideoSecondaryInfo={
	owner: R_VideoOwner;
	description?: R_TextWithRuns;
	subscribeButton: R_SubscribeButton;
	metadataRowContainer: R_MetadataRowContainer;
	showMoreText: R_SimpleText;
	showLessText: R_SimpleText;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: number;
	showMoreCommand?: C_Executor;
	showLessCommand?: EA_ChangeEngagementPanelVisibility;
};