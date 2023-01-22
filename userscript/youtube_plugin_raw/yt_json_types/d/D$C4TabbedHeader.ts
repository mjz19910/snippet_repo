type D$C4TabbedHeader={
	channelId: `UC${string}`;
	title: string;
	navigationEndpoint: E$Browse;
	avatar: D$Thumbnail;
	banner: D$Thumbnail;
	badges?: R$MetadataBadge[];
	headerLinks: R$ChannelHeaderLinks;
	subscribeButton: R$SubscribeButton;
	subscriberCountText: R$SimpleText;
	tvBanner: D$Thumbnail;
	mobileBanner: D$Thumbnail;
	trackingParams: string;
	sponsorButton?: R$Button;
	channelHandleText: R$TextWithRuns;
	videosCountText: R$TextWithRuns;
};