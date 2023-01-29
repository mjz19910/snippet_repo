type TD_GuideEntry_Primary<T_IconType extends string>={
	navigationEndpoint: E_Browse;
	icon: T_Icon<T_IconType>;
	trackingParams: string;
	formattedTitle: D_Text;
	accessibility: D_Accessibility;
	isPrimary: true;
};
