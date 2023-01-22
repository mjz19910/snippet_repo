type VideoOwnerData={
	thumbnail: D$Thumbnail;
	title: D$TextWithRuns;
	subscriptionButton: D$SubscriptionButton;
	navigationEndpoint: E$Browse;
	subscriberCountText: D$SimpleText;
	trackingParams: string;
	membershipButton: R$Button;
}|{
	thumbnail: D$Thumbnail;
	title: D$TextWithRuns;
	subscriptionButton: D$SubscriptionButton;
	navigationEndpoint: E$Browse;
	subscriberCountText: D$SimpleText;
	trackingParams: string;
	badges: R$MetadataBadgeRenderer[];
	membershipButton: R$Button;
};
