type UrlEndpoint<T extends {url: string;},C extends BaseUrl<any>[]>={
	clickTrackingParams: string;
	loggingUrls: C;
	commandMetadata: WebCommandMetadataTemplateType;
	urlEndpoint: T;
};
