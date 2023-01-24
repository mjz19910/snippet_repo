type R_BrowsePage={
	rootVe?: number;
	url: string;
	endpoint: E_Browse;
	page: "browse";
	response: RSB_t;
	expirationTime?: number;
	previousCsn?: string;
};