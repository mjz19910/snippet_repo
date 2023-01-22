type BrowsePageResponse={
	rootVe?: number;
	url: string;
	endpoint: E$Browse;
	page: "browse";
	response: BrowseResponse;
	expirationTime?: number;
	previousCsn?: string;
};