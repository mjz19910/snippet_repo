type PageTypeBrowse={
	pageType: "browse";
	endpoint: E_Browse;
	response: R_BrowsePage;
	fromHistory: boolean;
	navigationDoneMs: number;
};