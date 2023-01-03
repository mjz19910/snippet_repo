type PageTypeChannel={
	pageType: "channel";
	endpoint: YtEndpoint;
	response: YtChannelPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};