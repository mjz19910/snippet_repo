type D_GuideEntry_ShortsTab={
	icon: T_Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: D_Text;
	accessibility: D_Accessibility;
	serviceEndpoint: T_SE_Signal<{},{}>|E_ReelWatch;
	isPrimary: true;
};
