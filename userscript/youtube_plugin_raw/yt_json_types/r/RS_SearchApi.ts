type R_SearchApi={
	responseContext: RC_ResponseContext;
	contents?: R_TabbedSearchResults;
	continuationContents?: RC_MusicShelf;
	trackingParams: string;
	header?: R_MusicHeader;
}|RS_Search;