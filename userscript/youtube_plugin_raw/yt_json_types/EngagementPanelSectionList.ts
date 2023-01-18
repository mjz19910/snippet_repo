type EngagementSectionPanelId=MakeTargetId<"engagement-panel",[
	"clip-create",
	"structured-description",
][number]>;

type EngagementPanelSectionList=ContentTemplate<EngagementPanelSectionListContent>&{
	panelIdentifier?: EngagementSectionPanelId;
	header?: EngagementPanelTitleHeaderRenderer;
	veType?: 76278|124975;
	targetId: EngagementPanelSectionTargetId;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands?: [
		ChangeEngagementPanelVisibilityAction,
		ShowEngagementPanelScrimAction
	];
	loggingDirectives: LoggingDirectives;
};