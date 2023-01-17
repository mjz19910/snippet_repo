type SearchApiResponse={
	responseContext: ResponseContext;
	contents?: TabbedSearchResultsRenderer;
	continuationContents?: MusicShelfContinuation;
	trackingParams: string;
	header?: MusicHeaderRenderer;
}|SearchResponse;