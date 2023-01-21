type SearchResponse=ContentsTemplate<TwoColumnSearchResultsRenderer>&{
	responseContext: RC$ResponseContext;
	estimatedResults: `${number}`;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	refinements: string[];
	onResponseReceivedCommands: SearchResponseReceivedCommandItem[];
	targetId: "search-page";
};