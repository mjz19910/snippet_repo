type PageTypeWatch={
	pageType: "watch";
	endpoint: E$WatchEndpoint;
	response: WatchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};