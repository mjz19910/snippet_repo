type VideoOwnerData={
	thumbnail: D$Thumbnail;
	title: D$TextWithRuns;
	subscriptionButton?: D$SubscriptionButton;
	navigationEndpoint: E$BrowseEndpoint;
	subscriberCountText?: D$SimpleText;
	trackingParams: string;
	badges: MetadataBadgeRenderer[];
}|{
	thumbnail: D$Thumbnail;
	title: D$TextWithRuns;
	subscriptionButton: D$SubscriptionButton;
	navigationEndpoint: E$BrowseEndpoint;
	subscriberCountText: D$SimpleText;
	trackingParams: string;
	membershipButton: R$ButtonRenderer;
};
