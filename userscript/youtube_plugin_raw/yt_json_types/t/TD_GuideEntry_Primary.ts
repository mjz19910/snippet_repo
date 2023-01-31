type TD_GuideEntry_Primary<T_IconType extends string>={
	navigationEndpoint: GE_Browse;
	icon: T_Icon<T_IconType>;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	isPrimary: true;
};
