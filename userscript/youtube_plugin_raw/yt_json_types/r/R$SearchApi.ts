type R_SearchApi={
	responseContext: RC_ResponseContext;
	contents?: R_TabbedSearchResults;
	continuationContents?: MusicShelfContinuation;
	trackingParams: string;
	header?: R_MusicHeader;
}|RS_Search;