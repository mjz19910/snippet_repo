type BrowseCommandMetadata<T extends WebCommandMetadataTemplateType>={
	webCommandMetadata: T;
	// parentTrackingParams
	resolveUrlCommandMetadata: ResolveUrlCommandMetadata;
};
