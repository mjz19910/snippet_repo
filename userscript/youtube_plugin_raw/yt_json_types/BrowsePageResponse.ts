type BrowsePageResponse={
	rootVe?: number;
	url: string;
	endpoint: E_BrowseEndpoint;
	page: "browse";
	response: BrowseResponse;
	expirationTime?: number;
	previousCsn?: string;
};