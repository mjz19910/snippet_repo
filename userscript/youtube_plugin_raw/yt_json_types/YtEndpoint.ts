type YtEndpoint={
	clickTrackingParams?: string;
	commandMetadata?: CommandMetadata;
	watchEndpoint?: WatchEndpointData;
	urlEndpoint?: UrlEndpointData;
	signalServiceEndpoint?: SignalServiceEndpointData;
	browseEndpoint?: BrowseEndpointData;
	searchEndpoint?: SearchEndpointData;
	setSettingEndpoint?: SetSettingEndpointData;
	signalNavigationEndpoint?: SignalNavigationEndpointData;
	signOutEndpoint?: SignOutEndpointData;
	getAccountsListInnertubeEndpoint?: GetAccountsListInnertubeEndpointData;
	changeKeyedMarkersVisibilityCommand?: ChangeKeyedMarkersVisibilityCommand;
};