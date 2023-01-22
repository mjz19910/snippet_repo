interface VE124975_EngagementPanelSectionItem {
	panelIdentifier?: "engagement-panel-structured-description";
	header: R_EngagementPanelTitleHeader;
	content: R_StructuredDescriptionContent;
	veType: 124975;
	targetId: "engagement-panel-structured-description";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	identifier?: I$ShortsSurfaceIdentifier<this['targetId']>;
	loggingDirectives: A_LoggingDirectives;
}
