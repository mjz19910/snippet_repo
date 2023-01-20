type PageTypeBrowse={
	pageType: "browse";
	endpoint: E$BrowseEndpoint;
	response: BrowsePageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};