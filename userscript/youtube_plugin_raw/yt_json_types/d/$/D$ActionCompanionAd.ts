type D_ActionCompanionAd={
	headline: D_TemplatedText;
	description: D_TemplatedText;
	actionButton: R_Button;
	iconImage: R_ThumbnailsList;
	bannerImage: R_ThumbnailsList;
	navigationEndpoint: {};
	trackingParams: string;
	adInfoRenderer: RL$ActionCompanionAdInfo;
	adVideoId: string;
	impressionPings: T$BaseUrl<`${"https"}://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: D_AdLayoutLogging;
	associatedCompositePlayerBytesLayoutId?: `${string}-0000-${string}-${string}-${string}`;
};