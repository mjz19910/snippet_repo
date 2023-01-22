type EngagementPanelMenu=R$Menu|SortFilterSubMenuRenderer;

type EngagementPanelTitleHeader={
	title: D$TextT;
	contextualInfo?: D$TextWithRuns;
	informationButton?: R$Button;
	menu?: EngagementPanelMenu;
	visibilityButton: R$Button;
	trackingParams: string;
};
type EngagementPanelMenuAll={
	title: D$TextWithRuns;
	contextualInfo: D$TextWithRuns;
	menu: SortFilterSubMenuRenderer;
	visibilityButton: R$Button;
	trackingParams: string;
}

type R$EngagementPanelTitleHeaderRenderer={
	engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeader;
};