type PageTypeSearch={
	pageType: "search";
	endpoint: SearchEndpoint;
	response: SearchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
