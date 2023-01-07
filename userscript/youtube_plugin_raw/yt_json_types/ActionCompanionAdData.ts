type ActionCompanionAdData={
	headline: TemplatedText;
	description: TemplatedText;
	actionButton: ButtonRenderer;
	iconImage: ThumbnailsList;
	bannerImage: ThumbnailsList;
	navigationEndpoint: UrlEndpoint;
	trackingParams: string;
	adInfoRenderer: ActionCompanionAdInfoRenderers;
	adVideoId: string;
	impressionPings: BaseUrl<`${"https"}://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: AdLayoutLoggingData;
	associatedCompositePlayerBytesLayoutId: `${string}-0000-${string}-${string}-${string}`;
};
type UrlEndpoint={
	clickTrackingParams:string;
	loggingUrls:BaseUrl<`${"https"}://www.googleadservices.com/pagead/aclk?${string}`>[];
	commandMetadata:{webCommandMetadata:{}},urlEndpoint:{url:string,target:string}}