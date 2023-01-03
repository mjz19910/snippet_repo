type YtEndpoint={
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
	loadMarkersCommand: {
		entityKeys: string[];
	};
}|{
	changeKeyedMarkersVisibilityCommand: ChangeKeyedMarkersVisibilityCommand;
}|{
	commandMetadata: CommandMetadata;
}|{
	clickTrackingParams: string;
};