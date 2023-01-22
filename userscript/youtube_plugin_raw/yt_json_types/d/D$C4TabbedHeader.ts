type D__C4TabbedHeader={
	channelId: `UC${string}`;
	title: string;
	navigationEndpoint: E$Browse;
	avatar: D__Thumbnail;
	banner: D__Thumbnail;
	badges?: R_MetadataBadge[];
	headerLinks: R_ChannelHeaderLinks;
	subscribeButton: R_SubscribeButton;
	subscriberCountText: R_SimpleText;
	tvBanner: D__Thumbnail;
	mobileBanner: D__Thumbnail;
	trackingParams: string;
	sponsorButton?: R_Button;
	channelHandleText: R_TextWithRuns;
	videosCountText: R_TextWithRuns;
};