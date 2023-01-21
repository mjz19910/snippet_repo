interface VE124975_EngagementPanelSectionItem {
	panelIdentifier?: "engagement-panel-structured-description";
	header: R$EngagementPanelTitleHeaderRenderer;
	content: StructuredDescriptionContentRenderer;
	veType: 124975;
	targetId: "engagement-panel-structured-description";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	identifier?: ShortsSurfaceIdentifier<this['targetId']>;
	loggingDirectives: A$LoggingDirectives;
}
