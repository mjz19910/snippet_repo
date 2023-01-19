type ChannelPageResponse={
	page: "channel";
	endpoint: BrowseEndpoint;
	response: ChannelResponse;
	url: string;
	expirationTime?: number;
	previousCsn?: string;
};
