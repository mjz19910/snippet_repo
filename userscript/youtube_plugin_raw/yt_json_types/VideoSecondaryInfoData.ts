type VideoSecondaryInfoData={
	owner: R$VideoOwner;
	description?: D$TextWithRuns;
	subscribeButton: R$SubscribeButton;
	metadataRowContainer: R$MetadataRowContainer;
	showMoreText: D$SimpleText;
	showLessText: D$SimpleText;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: number;
	showMoreCommand?: E$CommandExecutorCommand;
	showLessCommand?: E$ChangeEngagementPanelVisibilityAction;
};