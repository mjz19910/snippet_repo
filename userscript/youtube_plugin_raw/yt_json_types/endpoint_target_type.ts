type endpoint_target_type=Partial<{
	watchEndpoint: WatchEndpointData;
	browseEndpoint: BrowseEndpointData;
	searchEndpoint: SearchEndpointData;
	setSettingEndpoint: SetSettingEndpointData;
	signalServiceEndpoint: SignalServiceEndpointData;
	urlEndpoint: UrlEndpointData;
	resolveUrlCommandMetadata: ResolveUrlCommandMetadataData;
	signalNavigationEndpoint: SignalNavigationEndpointData;
	signOutEndpoint: SignOutEndpointData;
}>;