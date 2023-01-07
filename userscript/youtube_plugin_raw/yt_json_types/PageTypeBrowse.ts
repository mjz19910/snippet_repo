type PageTypeBrowse={
	pageType: "browse";
	endpoint: YtEndpoint;
	response: BrowsePageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};