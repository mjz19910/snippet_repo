type UrlEndpoint<L_urls extends BaseUrl<any>[],C_meta_1 extends WebCommandMetadataTemplateType,Ep extends {url: string;}>={
	clickTrackingParams: string;
	loggingUrls: L_urls;
	commandMetadata: C_meta_1;
	urlEndpoint: Ep;
};
