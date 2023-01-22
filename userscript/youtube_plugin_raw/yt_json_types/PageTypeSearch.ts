type PageTypeSearch={
	pageType: "search";
	endpoint: E$Search;
	response: R_SearchPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};