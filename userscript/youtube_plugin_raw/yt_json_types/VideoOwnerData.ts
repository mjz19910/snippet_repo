type VideoOwnerData={
	thumbnail: Thumbnail<{}>;
	title: TextT;
	subscriptionButton: SubscriptionButton;
	navigationEndpoint: BrowseEndpoint<ChannelNavigationEndpointWebCommandMetadata>;
	subscriberCountText: SimpleText;
	trackingParams: string;
};
