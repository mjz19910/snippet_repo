type R_PageTypeSearch={
	pageType: "search";
	endpoint: E_Search;
	response: R_SearchPage;
	fromHistory: boolean;
	navigationDoneMs: number;
};