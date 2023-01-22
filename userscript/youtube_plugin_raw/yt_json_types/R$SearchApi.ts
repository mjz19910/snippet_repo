type R$SearchApi={
	responseContext: RC$ResponseContext;
	contents?: R$TabbedSearchResults;
	continuationContents?: MusicShelfContinuation;
	trackingParams: string;
	header?: R$MusicHeader;
}|R$Search;