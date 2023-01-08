type VideoSecondaryInfoData={
	owner: VideoOwnerRenderer;
	description?: TextT;
	subscribeButton: SubscribeButtonRenderer;
	metadataRowContainer: MetadataRowContainerRenderer;
	showMoreText: SimpleText;
	showLessText: SimpleText;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: number;
	showMoreCommand?: CommandExecutorCommand;
	showLessCommand?: ChangeEngagementPanelVisibilityAction;
};