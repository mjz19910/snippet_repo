type D_VideoSecondaryInfo={
	owner: R_VideoOwner;
	description?: D_Text;
	subscribeButton: R_SubscribeButton;
	metadataRowContainer: RMD_RowContainer;
	showMoreText: D_Text;
	showLessText: D_Text;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: number;
	showMoreCommand?: C_Executor;
	showLessCommand?: A_ChangeEngagementPanelVisibility;
};