type PageTypeBrowse={
	pageType: "browse";
	endpoint: E$Browse;
	response: R_BrowsePage;
	fromHistory: boolean;
	navigationDoneMs: number;
};