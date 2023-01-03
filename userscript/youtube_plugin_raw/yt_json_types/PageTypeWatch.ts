type PageTypeWatch={
	pageType: "watch";
	endpoint: YtEndpoint;
	response: YtWatchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};