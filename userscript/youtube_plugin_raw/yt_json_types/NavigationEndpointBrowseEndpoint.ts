type BrowseEndpointContextMusicConfigData={
	pageType: "MUSIC_PAGE_TYPE_ARTIST";
};

type BrowseEndpointContextMusicConfig={
	browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfigData;
};

type BrowseEndpointContextSupportedConfigs=BrowseEndpointContextMusicConfig;

type NavigationEndpointBrowseEndpoint={
	browseId: `UC${string}`;
	canonicalBaseUrl?: `/@${string}`;
	browseEndpointContextSupportedConfigs?: BrowseEndpointContextSupportedConfigs;
};
