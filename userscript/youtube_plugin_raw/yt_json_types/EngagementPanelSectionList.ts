type EngagementPanelSectionList=ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier: EngagementSectionPanelId;
	header: EngagementPanelTitleHeaderRenderer;
	targetId: EngagementPanelSectionTargetId;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: EngagementPanelSectionShowCommands[];
	loggingDirectives: LoggingDirectives;
}|ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: EngagementSectionPanelId;
	header?: EngagementPanelTitleHeaderRenderer;
	veType: 76278;
	targetId: EngagementPanelSectionTargetId;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands?: EngagementPanelSectionShowCommands[];
	loggingDirectives: LoggingDirectives;
}|ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: EngagementSectionPanelId;
	header?: EngagementPanelTitleHeaderRenderer;
	veType: 99999;
	targetId: EngagementPanelSectionTargetId;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands?: EngagementPanelSectionShowCommands[];
	loggingDirectives: LoggingDirectives;
}|VE124975_EngagementPanelSectionItem|ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: EngagementSectionPanelId;
	header?: EngagementPanelTitleHeaderRenderer;
	veType: 126250;
	targetId: EngagementPanelSectionTargetId;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands?: EngagementPanelSectionShowCommands[];
	loggingDirectives: LoggingDirectives;
}|VE139722_EngagementPanelSectionItem;