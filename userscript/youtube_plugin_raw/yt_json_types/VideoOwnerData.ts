type D__VideoOwner={
	thumbnail: D__Thumbnail;
	title: R_TextWithRuns;
	subscriptionButton: D__SubscriptionButton;
	navigationEndpoint: E$Browse;
	subscriberCountText: R_SimpleText;
	trackingParams: string;
	membershipButton: R_Button;
}|{
	thumbnail: D__Thumbnail;
	title: R_TextWithRuns;
	subscriptionButton: D__SubscriptionButton;
	navigationEndpoint: E$Browse;
	subscriberCountText: R_SimpleText;
	trackingParams: string;
	badges: R_MetadataBadge[];
	membershipButton: R_Button;
};