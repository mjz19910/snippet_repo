type BrowsePageResponse={
	page: "browse";
	endpoint: BrowseEndpoint<BrowseWebCommandMetadata>;
	response: BrowseResponse;
	url: YtUrlFormat;
	previousCsn?: string;
};