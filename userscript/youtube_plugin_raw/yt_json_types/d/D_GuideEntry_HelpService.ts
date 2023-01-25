type D_GuideEntry_HelpService={
	icon: T_Icon<"HELP">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	serviceEndpoint: TE_SignalService<{},{}>;
};
