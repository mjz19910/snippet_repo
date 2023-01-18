type GenericEngagementPanelSectionItem={
	content: AdsEngagementPanelContentRenderer;
	targetId: "engagement-panel-ads";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: LoggingDirectives;
}|{
	panelIdentifier: "engagement-panel-macro-markers-description-chapters";
	header: EngagementPanelTitleHeaderRenderer;
	content: MacroMarkersListRenderer;
	targetId: "engagement-panel-macro-markers-description-chapters";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: LoggingDirectives;
};
type GenericEngagementPanelSectionItem_tmp={
	targetId: EngagementPanelSectionTargetId;
}