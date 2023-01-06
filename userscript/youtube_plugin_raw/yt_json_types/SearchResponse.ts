type SearchResponse={
	responseContext: ResponseContext;
	estimatedResults: `${number}`;
	contents: TwoColumnSearchResultsRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	refinements: string[];
	onResponseReceivedCommands: SearchResponseReceivedCommandItem[];
	targetId: "search-page";
};