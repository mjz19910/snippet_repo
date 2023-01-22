type R$BrowsePage={
	rootVe?: number;
	url: string;
	endpoint: E$Browse;
	page: "browse";
	response: R$Browse;
	expirationTime?: number;
	previousCsn?: string;
};