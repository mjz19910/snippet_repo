type FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: Thumbnail;
	trackingParams: string;
	navigationEndpoint: E$BrowseEndpoint;
	channelName: string;
	subscribeButton: SubscribeButtonRenderer;
};