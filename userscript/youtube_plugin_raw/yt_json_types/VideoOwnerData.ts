type VideoOwnerData={
	thumbnail: D$Thumbnail;
	title: D$TextWithRuns;
	subscriptionButton?: D$SubscriptionButton;
	navigationEndpoint: E$BrowseEndpoint;
	subscriberCountText?: D$SimpleText;
	trackingParams: string;
	badges: R$MetadataBadgeRenderer[];
}|{
	thumbnail: D$Thumbnail;
	title: D$TextWithRuns;
	subscriptionButton: D$SubscriptionButton;
	navigationEndpoint: E$BrowseEndpoint;
	subscriberCountText: D$SimpleText;
	trackingParams: string;
	membershipButton: R$ButtonRenderer;
}|{
	thumbnail: D$Thumbnail;
	title: D$TextWithRuns;
	subscriptionButton: D$SubscriptionButton;
	navigationEndpoint: E$BrowseEndpoint;
	subscriberCountText: D$SimpleText;
	trackingParams: string;
	badges: R$MetadataBadgeRenderer[];
	membershipButton: R$ButtonRenderer;
};
