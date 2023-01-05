type EndpointTypes={
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
	loadMarkersCommand?: LoadMarkersCommandData;
	changeKeyedMarkersVisibilityCommand?: ChangeKeyedMarkersVisibilityCommand;
	reloadContinuationItemsCommand?: ReloadContinuationItemsCommandData;
	createCommentEndpoint?: CreateCommentEndpointData;
	confirmDialogEndpoint?: ConfirmDialogEndpointData;
	appendContinuationItemsAction?: AppendContinuationItemsAction;
};
interface YtEndpoint extends EndpointTypes {
	clickTrackingParams: string;
}