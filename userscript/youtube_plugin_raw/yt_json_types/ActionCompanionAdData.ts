type ActionCompanionAdData={
	headline: TemplatedText;
	description: TemplatedText;
	actionButton: ButtonRenderer;
	iconImage: ThumbnailsList;
	bannerImage: ThumbnailsList;
	navigationEndpoint: UrlEndpoint<[
		// spell:disable-next
		BaseUrl<`${"https"}://www.googleadservices.com/pagead/aclk?${string}`>,
		// spell:disable-next
		BaseUrl<`${"https"}://ad.doubleclick.net/ddm/trackclk/${string}`>,
	],WebCommandMetadataTemplateType,ExternalUrlEndpointData>;
	trackingParams: string;
	adInfoRenderer: ActionCompanionAdInfoRenderers;
	adVideoId: string;
	impressionPings: BaseUrl<`${"https"}://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: AdLayoutLoggingData;
	associatedCompositePlayerBytesLayoutId?: `${string}-0000-${string}-${string}-${string}`;
};