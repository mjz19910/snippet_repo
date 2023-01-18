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
}|ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: EngagementSectionPanelId;
	header?: EngagementPanelTitleHeaderRenderer;
	veType: 124975;
	targetId: EngagementPanelSectionTargetId;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands?: EngagementPanelSectionShowCommands[];
	loggingDirectives: LoggingDirectives;
}|ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: EngagementSectionPanelId;
	header?: EngagementPanelTitleHeaderRenderer;
	veType: 126250;
	targetId: EngagementPanelSectionTargetId;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands?: EngagementPanelSectionShowCommands[];
	loggingDirectives: LoggingDirectives;
}|{
	header: EngagementPanelTitleHeaderRenderer;
	content: SectionListRenderer;
	veType: 139722;
	targetId: "engagement-panel-comments-section";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	continuationService: "ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE";
	identifier: {
		surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
		tag: "shorts-comments-panel";
	};
	loggingDirectives: LoggingDirectives;
};
type EngagementPanelSectionListC=ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: EngagementSectionPanelId;
	header?: EngagementPanelTitleHeaderRenderer;
	veType?: 76278|99999|124975|126250;
	targetId: EngagementPanelSectionTargetId;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands?: EngagementPanelSectionShowCommands[];
	loggingDirectives: LoggingDirectives;
};