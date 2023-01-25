type D_GuideEntry_ShortsTab={
	icon: T_Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	serviceEndpoint: TE_SignalService<{},{}>|E_ReelWatch;
	isPrimary: true;
};
