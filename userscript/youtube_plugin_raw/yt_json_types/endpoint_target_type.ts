type endpoint_target_type=Partial<{
	watchEndpoint: WatchEndpointData;
	browseEndpoint: BrowseEndpointData;
	searchEndpoint: SearchEndpointData;
	setSettingEndpoint: SetSettingEndpointData;
	signalServiceEndpoint: SignalServiceEndpointData;
	urlEndpoint: UrlEndpointRoot;
	resolveUrlCommandMetadata: ResolveUrlCommandMetadataData;
	signalNavigationEndpoint: SignalNavigationEndpointData;
}>;