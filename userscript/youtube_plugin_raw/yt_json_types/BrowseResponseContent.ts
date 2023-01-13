type BrowseResponse={
	responseContext: ResponseContext;
	contents?: BrowseContents;
	header?: BrowseHeader;
	metadata?: ChannelMetadataRenderer;
	trackingParams: string;
	topbar?: DesktopTopbarRenderer;
	microformat?: MicroformatDataRenderer;
	frameworkUpdates?: EntityBatchUpdate;
	// ?
	maxAgeStoreSeconds?: number;
	background?: MusicThumbnailRenderer;
	// ?2
	onResponseReceivedActions?: ResponseReceivedAction[];
	sidebar?: SettingsSidebarRenderer;
	observedStateTags?: StateTag[];
	cacheMetadata?: CacheMetadata;
};