type PageTypeBrowse={
	pageType: "browse";
	endpoint: E$Browse;
	response: R$BrowsePage;
	fromHistory: boolean;
	navigationDoneMs: number;
};