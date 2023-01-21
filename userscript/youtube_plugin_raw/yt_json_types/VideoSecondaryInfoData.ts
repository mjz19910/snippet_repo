type VideoSecondaryInfoData={
	owner: VideoOwnerRenderer;
	description?: D$TextWithRuns;
	subscribeButton: SubscribeButtonRenderer;
	metadataRowContainer: MetadataRowContainerRenderer;
	showMoreText: D$SimpleText;
	showLessText: D$SimpleText;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: number;
	showMoreCommand?: CommandExecutorCommand;
	showLessCommand?: ChangeEngagementPanelVisibilityAction;
};