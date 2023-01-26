type TD_GuideEntry_Tid_Primary<T_IconType extends string,Tid>={
	navigationEndpoint: E_Browse;
	icon: T_Icon<T_IconType>;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	targetId: Tid;
	isPrimary: true;
};
