type EngagementPanelSectionListData={
	panelIdentifier?: "engagement-panel-clip-create";
	header?: engagementPanelTitleHeaderRenderer;
	content: EngagementPanelSectionListContent;
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
][number]
>;
type MakeTargetId<T extends string,U extends string>=`${T}-${U}`;