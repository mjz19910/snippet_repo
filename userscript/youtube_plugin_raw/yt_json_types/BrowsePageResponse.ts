export type BrowsePageResponse={
	page: "browse";
	endpoint: BrowseEndpoint;
	response: BrowseResponseContent;
	url: YtUrlFormat;
	previousCsn?: string;
};