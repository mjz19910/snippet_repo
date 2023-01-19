type EngagementPanelTitleHeader={
	title: TextWithRuns;
	contextualInfo: TextWithRuns;
	menu: SortFilterSubMenuRenderer;
	visibilityButton: ButtonRenderer;
	trackingParams: string;
}|{
	title: TextWithRuns;
	informationButton: ButtonRenderer;
	visibilityButton: ButtonRenderer;
	trackingParams: string;
}|{
	title: SimpleText;
	visibilityButton: ButtonRenderer;
	trackingParams: string;
};

type EngagementPanelTitleHeaderRenderer={
	engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeader;
};