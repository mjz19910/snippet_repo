type PageTypeBrowse={
	pageType: "browse";
	endpoint: E$Browse;
	response: BrowsePageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};