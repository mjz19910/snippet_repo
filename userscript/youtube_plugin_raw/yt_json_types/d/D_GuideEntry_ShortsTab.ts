type D_GuideEntry_ShortsTab={
	icon: T_Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	serviceEndpoint: T_SE_Signal<{},{}>|E_ReelWatch;
	isPrimary: true;
};
