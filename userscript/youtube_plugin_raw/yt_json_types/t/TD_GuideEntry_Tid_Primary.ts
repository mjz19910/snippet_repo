type TD_GuideEntry_Tid_Primary<T_IconType extends string,Tid>={
	navigationEndpoint: GE_Browse;
	icon: T_Icon<T_IconType>;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	targetId: Tid;
	isPrimary: true;
};
