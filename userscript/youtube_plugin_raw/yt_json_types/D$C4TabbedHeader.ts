type D$C4TabbedHeader={
	channelId: `UC${string}`;
	title: string;
	navigationEndpoint: E$BrowseEndpoint;
	avatar: D$Thumbnail;
	banner: D$Thumbnail;
	badges?: R$MetadataBadgeRenderer[];
	headerLinks: ChannelHeaderLinksRenderer;
	subscribeButton: SubscribeButtonRenderer;
	subscriberCountText: D$SimpleText;
	tvBanner: D$Thumbnail;
	mobileBanner: D$Thumbnail;
	trackingParams: string;
	sponsorButton?: R$Button;
	channelHandleText: D$TextWithRuns;
	videosCountText: D$TextWithRuns;
};
