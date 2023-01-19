type EngagementPanelMenu=MenuRenderer|SortFilterSubMenuRenderer;

type EngagementPanelTitleHeader={
	title: TextT;
	contextualInfo?: TextWithRuns;
	informationButton?: ButtonRenderer;
	menu?: EngagementPanelMenu;
	visibilityButton: ButtonRenderer;
	trackingParams: string;
};
type EngagementPanelMenuAll={
	title: TextWithRuns;
	contextualInfo: TextWithRuns;
	menu: SortFilterSubMenuRenderer;
	visibilityButton: ButtonRenderer;
	trackingParams: string;
}

type EngagementPanelTitleHeaderRenderer={
	engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeader;
};