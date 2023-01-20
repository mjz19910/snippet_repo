type BrowsePageResponse={
	rootVe?: number;
	url: string;
	endpoint: E$BrowseEndpoint;
	page: "browse";
	response: BrowseResponse;
	expirationTime?: number;
	previousCsn?: string;
};