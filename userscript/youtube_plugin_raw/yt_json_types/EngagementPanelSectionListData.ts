type EngagementPanelSectionListData={
	panelIdentifier?: "engagement-panel-clip-create";
	header?: EngagementPanelTitleHeaderRenderer;
	content: EngagementPanelSectionListContent;
	targetId: EngagementPanelSectionTargetIds;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: [
		changeEngagementPanelVisibilityAction,showEngagementPanelScrimAction
	];
	loggingDirectives: LoggingDirectives;
}|{
	panelIdentifier: "comment-item-section",
	header: EngagementPanelTitleHeaderRenderer;
	content: EngagementPanelSectionListContent;
	veType: 76278;
	targetId: "engagement-panel-comments-section";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: LoggingDirectives;
};
type EngagementPanelSectionTargetIds=MakeTargetId<
	"engagement-panel",
	[
		"ads",
		"clip-create",
		"structured-description",
	][number]
>;
type MakeTargetId<T extends string,U extends string>=`${T}-${U}`;