type VideoSecondaryInfoData={
	owner: VideoOwnerRenderer;
	subscribeButton: SubscribeButtonRenderer;
	metadataRowContainer: MetadataRowContainerRenderer;
	showMoreText: SimpleText;
	showLessText: SimpleText;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: 3;
};
type MetadataRowContainerRenderer={
	metadataRowContainerRenderer: {
		rows: [
			{}
		];
		collapsedItemCount: 2;
		trackingParams: string;
	};
};
type VideoOwnerRenderer={
	videoOwnerRenderer: {
		thumbnail: Thumbnail;
		title: TextT;
		subscriptionButton: SubscriptionButton;
		navigationEndpoint: BrowseEndpoint<never>;
		subscriberCountText: SimpleText;
		trackingParams: string;
	};
};
type VideoSecondaryInfoRenderer={
	videoSecondaryInfoRenderer: VideoSecondaryInfoData;
};
