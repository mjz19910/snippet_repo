type EngagementPanelSectionListData={
	panelIdentifier?: "engagement-panel-clip-create";
	header?: engagementPanelTitleHeaderRenderer;
	content: EngagementPanelSectionListContent;
	targetId: "engagement-panel-ads";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: [
		changeEngagementPanelVisibilityAction,showEngagementPanelScrimAction
	];
	loggingDirectives: LoggingDirectives;
};