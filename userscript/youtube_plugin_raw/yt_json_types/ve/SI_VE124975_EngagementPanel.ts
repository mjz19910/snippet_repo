interface SI_VE124975_EngagementPanel {
	panelIdentifier: "engagement-panel-structured-description";
	header: R_EngagementPanelTitleHeader;
	content: R_StructuredDescriptionContent;
	veType: 124975;
	targetId: "engagement-panel-structured-description";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	identifier?: T_ShortsSurfaceIdentifier<this['targetId']>;
	loggingDirectives: D_LoggingDirectives;
}
