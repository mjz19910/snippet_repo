type EngagementPanelMenu=MenuRenderer|SortFilterSubMenuRenderer;

type EngagementPanelTitleHeader={
	title: TextT;
	contextualInfo?: TextWithRuns;
	informationButton?: R$Button;
	menu?: EngagementPanelMenu;
	visibilityButton: R$Button;
	trackingParams: string;
};
type EngagementPanelMenuAll={
	title: TextWithRuns;
	contextualInfo: TextWithRuns;
	menu: SortFilterSubMenuRenderer;
	visibilityButton: R$Button;
	trackingParams: string;
}

type EngagementPanelTitleHeaderRenderer={
	engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeader;
};