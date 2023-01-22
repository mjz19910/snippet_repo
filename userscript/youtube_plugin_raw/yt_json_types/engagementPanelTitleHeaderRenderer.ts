type EngagementPanelMenu=R$Menu|SortFilterSubMenuRenderer;

type EngagementPanelTitleHeader={
	title: D$TextT;
	contextualInfo?: D$TextWithRuns;
	informationButton?: R$ButtonRenderer;
	menu?: EngagementPanelMenu;
	visibilityButton: R$ButtonRenderer;
	trackingParams: string;
};
type EngagementPanelMenuAll={
	title: D$TextWithRuns;
	contextualInfo: D$TextWithRuns;
	menu: SortFilterSubMenuRenderer;
	visibilityButton: R$ButtonRenderer;
	trackingParams: string;
}

type R$EngagementPanelTitleHeaderRenderer={
	engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeader;
};