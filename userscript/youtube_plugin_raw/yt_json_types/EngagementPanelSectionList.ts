type EngagementSectionPanelId=
	|MakeTargetId<"engagement-panel",[
		"clip-create",
		"structured-description",
	][number]>
	|"comment-item-section"
	|string&{_tag:"string"};

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