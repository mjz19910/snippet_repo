type SearchResponse=T$Contents<TwoColumnSearchResultsRenderer>&{
	responseContext: RC$ResponseContext;
	estimatedResults: `${number}`;
	trackingParams: string;
	topbar: R$DesktopTopbar;
	refinements: string[];
	onResponseReceivedCommands: SearchResponseReceivedCommandItem[];
	targetId: "search-page";
};