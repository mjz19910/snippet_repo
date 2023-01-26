type TD_GuideEntry_Simple<T extends string>={
	navigationEndpoint: E_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
};
