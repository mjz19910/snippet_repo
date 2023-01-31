type D_C4TabbedHeader={
	channelId: `UC${string}`;
	title: string;
	navigationEndpoint: GE_Browse;
	avatar: R_Thumbnail;
	banner: R_Thumbnail;
	badges?: RMD_Badge[];
	headerLinks: R_ChannelHeaderLinks;
	subscribeButton: R_SubscribeButton;
	subscriberCountText: G_Text;
	tvBanner: R_Thumbnail;
	mobileBanner: R_Thumbnail;
	trackingParams: string;
	sponsorButton?: R_Button;
	channelHandleText: G_Text;
	videosCountText: G_Text;
};