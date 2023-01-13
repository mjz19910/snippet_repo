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
	onResponseReceivedActions?: ResponseReceivedAction[];
	sidebar?: SettingsSidebarRenderer;
	observedStateTags?: StateTag[];
	cacheMetadata?: CacheMetadata;
};
type BrowseHeader=FeedTabbedHeaderRenderer|C4TabbedHeaderRenderer;