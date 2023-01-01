type YtPageState={
	pageType: "browse";
	endpoint: YtEndpoint;
	response: YtPageResponseType;
	fromHistory: boolean;
	navigationDoneMs: number;
};