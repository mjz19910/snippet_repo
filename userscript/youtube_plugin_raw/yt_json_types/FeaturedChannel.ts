type FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: Thumbnail;
	trackingParams: string;
	navigationEndpoint: VE3611.navigationEndpoint;
	channelName: string;
	subscribeButton: SubscribeButtonRenderer;
};