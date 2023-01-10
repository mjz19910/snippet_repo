type EngagementPanelSectionListData=ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: "engagement-panel-clip-create";
	header?: EngagementPanelTitleHeaderRenderer;
	veType?: 76278;
	targetId: EngagementPanelSectionTargetIds;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: [
		changeEngagementPanelVisibilityAction,showEngagementPanelScrimAction
	];
	loggingDirectives: LoggingDirectives;
};
type EngagementPanelSectionTargetIds=MakeTargetId<
	"engagement-panel",
	[
		"ads",
		"clip-create",
		"structured-description",
		"comments-section",
	][number]
>;
type MakeTargetId<T extends string,U extends string>=`${T}-${U}`;