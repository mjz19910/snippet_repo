type D__ActionCompanionAd={
	headline: TemplatedText;
	description: TemplatedText;
	actionButton: R_Button;
	iconImage: R_ThumbnailsList;
	bannerImage: R_ThumbnailsList;
	navigationEndpoint: {};
	trackingParams: string;
	adInfoRenderer: RL$ActionCompanionAdInfo;
	adVideoId: string;
	impressionPings: BaseUrl<`${"https"}://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: D__AdLayoutLogging;
	associatedCompositePlayerBytesLayoutId?: `${string}-0000-${string}-${string}-${string}`;
};