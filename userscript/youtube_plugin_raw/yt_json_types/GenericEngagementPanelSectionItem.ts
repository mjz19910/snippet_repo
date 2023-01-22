type GenericEngagementPanelSectionItem={
	content: R$AdsEngagementPanelContent;
	targetId: "engagement-panel-ads";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: A$LoggingDirectives;
}|{
	panelIdentifier: "engagement-panel-macro-markers-description-chapters";
	header: R$EngagementPanelTitleHeader;
	content: R$MacroMarkersList;
	targetId: "engagement-panel-macro-markers-description-chapters";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: A$LoggingDirectives;
}|{
	panelIdentifier: "engagement-panel-clip-create";
	header: R$EngagementPanelTitleHeader;
	content: R$ClipSection;
	targetId: "engagement-panel-clip-create";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: E$ChangeEngagementPanelVisibilityAction[];
	loggingDirectives: A$LoggingDirectives;
}|{
	panelIdentifier: "engagement-panel-macro-markers-auto-chapters";
	header: R$EngagementPanelTitleHeader;
	content: R$MacroMarkersList;
	targetId: "engagement-panel-macro-markers-auto-chapters";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: A$LoggingDirectives;
};
type GenericEngagementPanelSectionItem_tmp={
	targetId: EngagementPanelSectionTargetId;
}