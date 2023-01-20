type PageTypeBrowse={
	pageType: "browse";
	endpoint: E_BrowseEndpoint;
	response: BrowsePageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};