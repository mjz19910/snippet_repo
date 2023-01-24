type D_VideoOwner={
	thumbnail: D_Thumbnail;
	title: R_TextWithRuns;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: R_SimpleText;
	trackingParams: string;
	membershipButton: R_Button;
}|{
	thumbnail: D_Thumbnail;
	title: R_TextWithRuns;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: R_SimpleText;
	trackingParams: string;
	badges: RMD_Badge[];
	membershipButton: R_Button;
};