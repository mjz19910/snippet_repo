type PageTypeChannel={
	pageType: "channel";
	endpoint: YtEndpoint;
	response: ChannelPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};