type TD_GuideEntry_Simple<T extends string>={
	navigationEndpoint: GE_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
};
