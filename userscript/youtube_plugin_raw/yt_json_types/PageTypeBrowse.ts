type PageTypeBrowse={
	pageType: "browse";
	endpoint: YtEndpoint;
	response: YtBrowsePageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
