type RS_Search=Record<"contents",R_TwoColumnSearchResults>&{
	responseContext: RC$ResponseContext;
	estimatedResults: `${number}`;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	refinements: string[];
	onResponseReceivedCommands: C_AdsControlFlowOpportunityReceived[];
	targetId: "search-page";
};