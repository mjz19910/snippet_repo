type R_SearchApi={
	responseContext: RC$ResponseContext;
	contents?: R_TabbedSearchResults;
	continuationContents?: MusicShelfContinuation;
	trackingParams: string;
	header?: R_MusicHeader;
}|RS_Search;