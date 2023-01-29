type D_VideoOwner={
	thumbnail: R_Thumbnail;
	title: D_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: D_Text;
	trackingParams: string;
	badges?: RMD_Badge[];
	membershipButton?: R_Button;
};
type TD_VideoOwner={
	thumbnail: R_Thumbnail;
	title: D_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: D_Text;
	trackingParams: string;
	membershipButton: R_Button;
}|{
	thumbnail: R_Thumbnail;
	title: D_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: D_Text;
	trackingParams: string;
	badges: RMD_Badge[];
	membershipButton: R_Button;
}|{
	thumbnail: R_Thumbnail;
	title: D_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: D_Text;
	trackingParams: string;
};