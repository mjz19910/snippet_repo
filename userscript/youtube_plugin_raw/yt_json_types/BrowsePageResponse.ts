type BrowsePageResponse={
	rootVe?: number;
	url: string;
	endpoint: BrowseEndpoint;
	page: "browse";
	response: BrowseResponse;
	expirationTime?: number;
	previousCsn?: string;
};