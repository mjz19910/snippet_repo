type PageTypeSearch={
	pageType: "search";
	endpoint: E$SearchEndpoint;
	response: SearchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
