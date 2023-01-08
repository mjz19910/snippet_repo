type FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: Thumbnail<{}>;
	trackingParams: string;
	navigationEndpoint: VE3611.NavigationEndpoint;
	channelName: string;
	subscribeButton: SubscribeButtonRenderer;
};