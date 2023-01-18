type EngagementPanelSectionList=ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: "engagement-panel-clip-create";
	header?: EngagementPanelTitleHeaderRenderer;
	veType?: 76278;
	targetId: EngagementPanelSectionTargetIds;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands?: [
		ChangeEngagementPanelVisibilityAction,
		ShowEngagementPanelScrimAction
	];
	loggingDirectives: LoggingDirectives;
};