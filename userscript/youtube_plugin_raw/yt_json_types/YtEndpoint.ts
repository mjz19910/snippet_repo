type YtEndpoint=[
	{watchEndpoint: WatchEndpointData;},
	{urlEndpoint: UrlEndpointData;},
	{signalServiceEndpoint: SignalServiceEndpointData;},
	{browseEndpoint: BrowseEndpointData;},
	{searchEndpoint: SearchEndpointData;},
	{setSettingEndpoint: SetSettingEndpointData;},
	{signalNavigationEndpoint: SignalNavigationEndpointData;},
	{signOutEndpoint: SignOutEndpointData;},
	{getAccountsListInnertubeEndpoint: GetAccountsListInnertubeEndpointData;},
	{loadMarkersCommand: LoadMarkersCommandData;},
	{changeKeyedMarkersVisibilityCommand: ChangeKeyedMarkersVisibilityCommand;},
	{commandMetadata: CommandMetadata;},
	{clickTrackingParams: string;},
	{reloadContinuationItemsCommand: ReloadContinuationItemsCommandData;},
	{createCommentEndpoint: CreateCommentEndpoint;}
][number];