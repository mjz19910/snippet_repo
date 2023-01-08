type PageTypeWatch={
	pageType: "watch";
	endpoint: WatchEndpoint;
	response: WatchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};