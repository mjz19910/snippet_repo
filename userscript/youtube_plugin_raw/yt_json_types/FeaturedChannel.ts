type FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: D$Thumbnail;
	trackingParams: string;
	navigationEndpoint: E$BrowseEndpoint;
	channelName: string;
	subscribeButton: SubscribeButtonRenderer;
};