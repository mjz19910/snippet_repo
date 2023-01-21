type EngagementPanelMenu=R$MenuRenderer|SortFilterSubMenuRenderer;

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

type R$EngagementPanelTitleHeader={
	engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeader;
};