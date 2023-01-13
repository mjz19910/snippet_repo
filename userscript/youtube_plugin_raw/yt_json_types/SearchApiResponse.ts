type SearchApiResponse={
	responseContext: ResponseContext;
	contents?: TabbedSearchResultsRenderer;
	continuationContents?: {};
	trackingParams: string;
	header?: {};
}|SearchResponse;