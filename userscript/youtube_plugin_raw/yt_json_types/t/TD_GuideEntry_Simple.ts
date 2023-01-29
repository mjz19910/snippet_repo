type TD_GuideEntry_Simple<T extends string>={
	navigationEndpoint: E_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: D_Text;
	accessibility: D_Accessibility;
};
