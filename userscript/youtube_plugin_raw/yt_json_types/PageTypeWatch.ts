type PageTypeWatch={
	pageType: "watch";
	endpoint: YtEndpoint;
	response: WatchPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};