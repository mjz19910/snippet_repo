type D_CommandRunItem={
	startIndex: number;
	length: number;
	onTap: C_Innertube;
	loggingDirectives?: D_LoggingDirectives;
};
type D_StyleRunItem={
	startIndex: number;
	length: number;
	fontColor: number;
};
type D_AttributedDescription={
	content: string;
	commandRuns: D_CommandRunItem[];
	styleRuns: D_StyleRunItem[];
};
type D_VideoSecondaryInfo={
	owner: R_VideoOwner;
	description?: G_Text;
	subscribeButton: R_SubscribeButton;
	metadataRowContainer: RMD_RowContainer;
	showMoreText: G_Text;
	showLessText: G_Text;
	trackingParams: string;
	defaultExpanded: boolean;
	descriptionCollapsedLines: number;
	showMoreCommand?: C_CommandExecutor;
	showLessCommand?: A_ChangeEngagementPanelVisibility;
	attributedDescription?: D_AttributedDescription;
};
