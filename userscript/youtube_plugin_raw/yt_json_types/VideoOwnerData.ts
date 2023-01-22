type D$VideoOwner={
	thumbnail: D$Thumbnail;
	title: R$TextWithRuns;
	subscriptionButton: D$SubscriptionButton;
	navigationEndpoint: E$Browse;
	subscriberCountText: R$SimpleText;
	trackingParams: string;
	membershipButton: R$Button;
}|{
	thumbnail: D$Thumbnail;
	title: R$TextWithRuns;
	subscriptionButton: D$SubscriptionButton;
	navigationEndpoint: E$Browse;
	subscriberCountText: R$SimpleText;
	trackingParams: string;
	badges: R$MetadataBadge[];
	membershipButton: R$Button;
};