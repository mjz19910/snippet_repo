type R_BrowsePage={
	rootVe?: number;
	url: string;
	endpoint: E_Browse;
	page: "browse";
	response: RS_Browse;
	expirationTime?: number;
	previousCsn?: string;
};