type FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: D$Thumbnail;
	trackingParams: string;
	navigationEndpoint: E$Browse;
	channelName: string;
	subscribeButton: SubscribeButtonRenderer;
};