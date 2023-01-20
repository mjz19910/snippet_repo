type D$C4TabbedHeader={
	channelId: `UC${string}`;
	title: string;
	navigationEndpoint: E$BrowseEndpoint;
	avatar: Thumbnail;
	banner: Thumbnail;
	badges?: MetadataBadgeRenderer[];
	headerLinks: ChannelHeaderLinksRenderer;
	subscribeButton: SubscribeButtonRenderer;
	subscriberCountText: SimpleText;
	tvBanner: Thumbnail;
	mobileBanner: Thumbnail;
	trackingParams: string;
	sponsorButton?: R$Button;
	channelHandleText: TextWithRuns;
	videosCountText: TextWithRuns;
};
