//#region SI_DB
type SI_DB_EngagementPanel_Ads={
	content: R_AdsEngagementPanelContent;
	targetId: "engagement-panel-ads";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
type SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters={
	panelIdentifier: "engagement-panel-macro-markers-description-chapters";
	header: R_EngagementPanelTitleHeader;
	content: R_MacroMarkersList;
	targetId: "engagement-panel-macro-markers-description-chapters";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
type SI_DB_EngagementPanel_ClipCreate={
	panelIdentifier: "engagement-panel-clip-create";
	header: R_EngagementPanelTitleHeader;
	content: R_ClipSection;
	targetId: "engagement-panel-clip-create";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: G_EngagementPanelSectionShowCommands[];
	loggingDirectives: D_LoggingDirectives;
};
type SI_DB_EngagementPanel_MacroMarkers_AutoChapters={
	panelIdentifier: "engagement-panel-macro-markers-auto-chapters";
	header: R_EngagementPanelTitleHeader;
	content: R_MacroMarkersList;
	targetId: "engagement-panel-macro-markers-auto-chapters";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
//#endregion
//#region SI_VE
type SI_VE76278_EngagementPanel={
	panelIdentifier: "comment-item-section";
	header: R_EngagementPanelTitleHeader;
	content: R_SectionList;
	veType: 76278;
	targetId: "engagement-panel-comments-section";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
type SI_VE99999_EngagementPanel={
	panelIdentifier: "shopping_panel_for_entry_point_5";
	header: R_EngagementPanelTitleHeader;
	content: R_ProductList;
	veType: 99999;
	targetId: "shopping_panel_for_entry_point_5";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
type SI_VE126250_EngagementPanel={
	panelIdentifier: "engagement-panel-searchable-transcript";
	header: R_EngagementPanelTitleHeader;
	content: R_ContinuationItem;
	veType: 126250;
	targetId: "engagement-panel-searchable-transcript";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: C_ScrollToEngagementPanel[];
	loggingDirectives: D_LoggingDirectives;
};
type SI_VE124975_EngagementPanel={
	panelIdentifier: "engagement-panel-structured-description";
	header: R_EngagementPanelTitleHeader;
	content: R_StructuredDescriptionContent;
	veType: 124975;
	targetId: "engagement-panel-structured-description";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	identifier?: T_ShortsSurfaceIdentifier<"engagement-panel-structured-description">;
	loggingDirectives: D_LoggingDirectives;
};
type SI_VE139722_EngagementPanel={
	header: R_EngagementPanelTitleHeader;
	content: R_SectionList;
	veType: 139722;
	targetId: "engagement-panel-comments-section";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	continuationService: "ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE";
	identifier: T_ShortsSurfaceIdentifier<"shorts-comments-panel">;
	loggingDirectives: D_LoggingDirectives;
};
//#endregion
