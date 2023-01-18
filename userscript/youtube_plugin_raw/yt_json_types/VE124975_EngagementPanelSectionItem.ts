interface VE124975_EngagementPanelSectionItem {
	header: EngagementPanelTitleHeaderRenderer;
	content: StructuredDescriptionContentRenderer;
	veType: 124975;
	targetId: "engagement-panel-structured-description";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	identifier: ShortsSurfaceIdentifier<this['targetId']>;
	loggingDirectives: LoggingDirectives;
}
