type PageTypeBrowse={
	pageType: "browse";
	endpoint: BrowseEndpoint;
	response: BrowsePageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};