type YtShortsResponse={
	page: "shorts";
};

type PageTypeShorts={
	pageType: "shorts";
	endpoint: ReelWatchEndpointData;
	response: YtShortsResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};