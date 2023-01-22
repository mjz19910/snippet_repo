type D__C4TabbedHeader={
	channelId: `UC${string}`;
	title: string;
	navigationEndpoint: E$Browse;
	avatar: D__Thumbnail;
	banner: D__Thumbnail;
	badges?: R$MetadataBadge[];
	headerLinks: R$ChannelHeaderLinks;
	subscribeButton: R$SubscribeButton;
	subscriberCountText: R$SimpleText;
	tvBanner: D__Thumbnail;
	mobileBanner: D__Thumbnail;
	trackingParams: string;
	sponsorButton?: R$Button;
	channelHandleText: R$TextWithRuns;
	videosCountText: R$TextWithRuns;
};