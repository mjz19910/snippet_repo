type TD_GuideEntry_NotPrimary<T extends string>={
	navigationEndpoint: E_Browse;
	icon: T_Icon<T>;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
};
