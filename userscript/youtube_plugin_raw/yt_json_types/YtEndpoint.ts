type YtEndpoint={
	clickTrackingParams?: string;
	watchEndpoint?: WatchEndpointData;
	urlEndpoint?: UrlEndpointData;
	signalServiceEndpoint?: SignalServiceEndpointData;
	browseEndpoint?: BrowseEndpointData;
	searchEndpoint?: SearchEndpointData;
	setSettingEndpoint?: SetSettingEndpointData;
	signalNavigationEndpoint?: SignalNavigationEndpointData;
	signOutEndpoint?: SignOutEndpointData;
	getAccountsListInnertubeEndpoint?: GetAccountsListInnertubeEndpointData;
}|{
	clickTrackingParams: string;
	loadMarkersCommand: {
		entityKeys: string[];
	};
}|{
	changeKeyedMarkersVisibilityCommand: ChangeKeyedMarkersVisibilityCommand;
}|{
	commandMetadata: CommandMetadata;
};