type ActionCompanionAdData={
	headline: TemplatedText;
	description: TemplatedText;
	actionButton: ButtonRenderer;
	iconImage: ThumbnailsList;
	bannerImage: ThumbnailsList;
	navigationEndpoint: NavigationEndpointTODO;
	trackingParams: string;
	adInfoRenderer: ActionCompanionAdInfoRenderers;
	adVideoId: string;
	impressionPings: BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: AdLayoutLoggingData;
};