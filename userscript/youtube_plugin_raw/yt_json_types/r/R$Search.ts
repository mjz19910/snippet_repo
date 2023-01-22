type R_Search=Record<"contents",R_TwoColumnSearchResults>&{
	responseContext: RC$ResponseContext;
	estimatedResults: `${number}`;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	refinements: string[];
	onResponseReceivedCommands: SearchResponseReceivedCommandItem[];
	targetId: "search-page";
};