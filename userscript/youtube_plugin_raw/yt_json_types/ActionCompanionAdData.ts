type D$ActionCompanionAd={
	headline: TemplatedText;
	description: TemplatedText;
	actionButton: R$Button;
	iconImage: R$ThumbnailsList;
	bannerImage: R$ThumbnailsList;
	navigationEndpoint: {};
	trackingParams: string;
	adInfoRenderer: RL$ActionCompanionAdInfo;
	adVideoId: string;
	impressionPings: BaseUrl<`${"https"}://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: AdLayoutLoggingData;
	associatedCompositePlayerBytesLayoutId?: `${string}-0000-${string}-${string}-${string}`;
};