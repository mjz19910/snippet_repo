type BrowsePageResponse={
	page: "browse";
	endpoint: BrowseEndpoint;
	response: BrowseResponse;
	url: YtUrlFormat;
	previousCsn?: string;
};