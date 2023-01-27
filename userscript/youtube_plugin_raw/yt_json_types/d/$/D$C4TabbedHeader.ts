type D_C4TabbedHeader={
	channelId: `UC${string}`;
	title: string;
	navigationEndpoint: E_Browse;
	avatar: R_Thumbnail;
	banner: R_Thumbnail;
	badges?: RMD_Badge[];
	headerLinks: R_ChannelHeaderLinks;
	subscribeButton: R_SubscribeButton;
	subscriberCountText: R_SimpleText;
	tvBanner: R_Thumbnail;
	mobileBanner: R_Thumbnail;
	trackingParams: string;
	sponsorButton?: R_Button;
	channelHandleText: R_TextRuns;
	videosCountText: R_TextRuns;
};