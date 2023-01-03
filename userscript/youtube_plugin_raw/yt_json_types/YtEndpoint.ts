type WatchEndpointPlugin={
	watchEndpoint: WatchEndpointData;
};

type UrlEndpointPlugin={
	urlEndpoint: UrlEndpointRoot;
};

type SignalServiceEndpointPlugin={
	signalServiceEndpoint: SignalServiceEndpointData;
};

type BrowseEndpointPlugin={
	browseEndpoint: BrowseEndpointData;
};

type SearchEndpointPlugin={
	searchEndpoint: SearchEndpointData;
};
type SetSettingEndpointPlugin={
	setSettingEndpoint: SetSettingEndpointData;
};

type SignalNavigationEndpointPlugin={
	signalNavigationEndpoint: SignalNavigationEndpointData;
};

type EndpointPlugins=[
	WatchEndpointPlugin,
	UrlEndpointPlugin,
	SignalServiceEndpointPlugin,
	BrowseEndpointPlugin,
	SearchEndpointPlugin,
	SetSettingEndpointPlugin,
	SignalNavigationEndpointPlugin
][number];

type YtEndpoint=YtEndpointBase&EndpointPlugins;
