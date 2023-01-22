type D__VideoOwner={
	thumbnail: D__Thumbnail;
	title: R$TextWithRuns;
	subscriptionButton: D__SubscriptionButton;
	navigationEndpoint: E$Browse;
	subscriberCountText: R$SimpleText;
	trackingParams: string;
	membershipButton: R$Button;
}|{
	thumbnail: D__Thumbnail;
	title: R$TextWithRuns;
	subscriptionButton: D__SubscriptionButton;
	navigationEndpoint: E$Browse;
	subscriberCountText: R$SimpleText;
	trackingParams: string;
	badges: R$MetadataBadge[];
	membershipButton: R$Button;
};