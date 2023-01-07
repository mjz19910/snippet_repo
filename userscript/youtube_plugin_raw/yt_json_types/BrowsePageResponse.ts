type BrowsePageResponse={
	page: "browse";
	endpoint: BrowseEndpoint<BrowseWebCommandMetadata>;
	response: BrowseResponseContent;
	url: YtUrlFormat;
	previousCsn?: string;
};