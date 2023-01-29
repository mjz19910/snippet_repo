type D_VideoOwner={
	thumbnail: R_Thumbnail;
	title: R_TextRuns;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: R_SimpleText;
	trackingParams: string;
	badges?: RMD_Badge[];
	membershipButton?: R_Button;
};
type TD_VideoOwner={
	thumbnail: R_Thumbnail;
	title: R_TextRuns;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: R_SimpleText;
	trackingParams: string;
	membershipButton: R_Button;
}|{
	thumbnail: R_Thumbnail;
	title: R_TextRuns;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: R_SimpleText;
	trackingParams: string;
	badges: RMD_Badge[];
	membershipButton: R_Button;
}|{
	thumbnail: R_Thumbnail;
	title: R_TextRuns;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: E_Browse;
	subscriberCountText: R_SimpleText;
	trackingParams: string;
};