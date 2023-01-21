type SearchApiResponse={
	responseContext: RC$ResponseContext;
	contents?: TabbedSearchResultsRenderer;
	continuationContents?: MusicShelfContinuation;
	trackingParams: string;
	header?: MusicHeaderRenderer;
}|SearchResponse;