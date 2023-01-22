type D$VideoSecondaryInfo={
	owner: R$VideoOwner;
	description?: R$TextWithRuns;
	subscribeButton: R$SubscribeButton;
	metadataRowContainer: R$MetadataRowContainer;
	showMoreText: R$SimpleText;
	showLessText: R$SimpleText;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: number;
	showMoreCommand?: E$CommandExecutorCommand;
	showLessCommand?: E$ChangeEngagementPanelVisibilityAction;
};