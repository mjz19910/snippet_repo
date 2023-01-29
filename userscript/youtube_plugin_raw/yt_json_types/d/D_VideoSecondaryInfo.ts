type D_VideoSecondaryInfo={
	owner: R_VideoOwner;
	description?: G_Text;
	subscribeButton: R_SubscribeButton;
	metadataRowContainer: RMD_RowContainer;
	showMoreText: G_Text;
	showLessText: G_Text;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: number;
	showMoreCommand?: C_Executor;
	showLessCommand?: A_ChangeEngagementPanelVisibility;
};