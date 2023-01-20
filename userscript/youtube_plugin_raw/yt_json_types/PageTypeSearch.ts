type PageTypeSearch={
	pageType: "search";
	endpoint: E_SearchEndpoint;
	response: SearchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
