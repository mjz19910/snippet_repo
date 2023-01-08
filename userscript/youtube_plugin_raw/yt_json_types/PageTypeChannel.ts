type PageTypeChannel={
	pageType: "channel";
	endpoint: ChannelEndpoint;
	response: ChannelPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};