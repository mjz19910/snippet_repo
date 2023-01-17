type SearchResponse=ContentsTemplate<TwoColumnSearchResultsRenderer>&{
	responseContext: ResponseContext;
	estimatedResults: `${number}`;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	refinements: string[];
	onResponseReceivedCommands: SearchResponseReceivedCommandItem[];
	targetId: "search-page";
};