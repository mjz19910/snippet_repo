type D__VideoSecondaryInfo={
	owner: R_VideoOwner;
	description?: R_TextWithRuns;
	subscribeButton: R_SubscribeButton;
	metadataRowContainer: R_MetadataRowContainer;
	showMoreText: R_SimpleText;
	showLessText: R_SimpleText;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: number;
	showMoreCommand?: E_CommandExecutorCommand;
	showLessCommand?: EA_ChangeEngagementPanelVisibility;
};