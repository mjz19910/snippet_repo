type D_GridChannel={
	channelId: DU_Channel_Id;
	thumbnail: D_Thumbnail;
	videoCountText: G_Text;
	subscriberCountText: G_Text;
	navigationEndpoint: E_VE3611;
	title: G_Text;
	subscribeButton: R_SubscribeButton;
	trackingParams: string;
};
type R_GridChannel={gridChannelRenderer: D_GridChannel;};
