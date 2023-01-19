type FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: Thumbnail;
	trackingParams: string;
	navigationEndpoint: BrowseEndpoint;
	channelName: string;
	subscribeButton: SubscribeButtonRenderer;
};