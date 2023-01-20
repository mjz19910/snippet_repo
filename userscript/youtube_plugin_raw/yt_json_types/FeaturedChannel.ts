type FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: Thumbnail;
	trackingParams: string;
	navigationEndpoint: E_BrowseEndpoint;
	channelName: string;
	subscribeButton: SubscribeButtonRenderer;
};