type BrowseEndpoint<T extends WebCommandMetadataTemplateType>={
	clickTrackingParams: string;
	commandMetadata: BrowseCommandMetadata<T>;
	browseEndpoint: BrowseEndpointData;
};
