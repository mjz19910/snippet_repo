type D_GuideEntry_ShortsTab={
	icon: T_Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	serviceEndpoint: T_SE_Signal<DC_Empty_WCM,{}>|E_ReelWatch;
	isPrimary: true;
};
