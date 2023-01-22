type R_SearchApi={
	responseContext: RC$ResponseContext;
	contents?: R_TabbedSearchResults;
	continuationContents?: MusicShelfContinuation;
	trackingParams: string;
	header?: R_MusicHeader;
}|R_Search;