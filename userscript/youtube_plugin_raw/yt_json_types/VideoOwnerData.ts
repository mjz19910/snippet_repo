type VideoOwnerData={
	thumbnail: D$Thumbnail;
	title: D$TextWithRuns;
	subscriptionButton?: SubscriptionButton;
	navigationEndpoint: E$BrowseEndpoint;
	subscriberCountText?: D$SimpleText;
	trackingParams: string;
	membershipButton?: R$ButtonRenderer;
	badges: MetadataBadgeRenderer[];
};
