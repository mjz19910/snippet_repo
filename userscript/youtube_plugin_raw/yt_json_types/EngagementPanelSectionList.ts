type EngagementPanelSectionList=ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: EngagementSectionPanelId;
	header?: EngagementPanelTitleHeaderRenderer;
	veType?: 76278|99999|124975|126250;
	targetId: EngagementPanelSectionTargetId;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands?: EngagementPanelSectionShowCommands[];
	loggingDirectives: LoggingDirectives;
};