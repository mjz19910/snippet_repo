type TD_GuideEntry_Primary<T_IconType extends string>={
	navigationEndpoint: E_Browse;
	icon: T_Icon<T_IconType>;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	isPrimary: true;
};
