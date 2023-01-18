type ActionCompanionAdData={
	headline: TemplatedText;
	description: TemplatedText;
	actionButton: ButtonRenderer;
	iconImage: ThumbnailsList;
	bannerImage: ThumbnailsList;
	navigationEndpoint: {};
	trackingParams: string;
	adInfoRenderer: ActionCompanionAdInfoRenderers;
	adVideoId: string;
	impressionPings: BaseUrl<`${"https"}://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: AdLayoutLoggingData;
	associatedCompositePlayerBytesLayoutId?: `${string}-0000-${string}-${string}-${string}`;
};