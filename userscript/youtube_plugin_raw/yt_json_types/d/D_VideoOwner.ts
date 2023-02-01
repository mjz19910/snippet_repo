type D_VideoOwner={
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText: G_Text;
	trackingParams: string;
	badges?: RMD_Badge[];
	membershipButton?: R_Button;
};
type TD_VideoOwner={
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText: G_Text;
	trackingParams: string;
	membershipButton: R_Button;
}|{
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText: G_Text;
	trackingParams: string;
	badges: RMD_Badge[];
	membershipButton: R_Button;
}|{
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText: G_Text;
	trackingParams: string;
};