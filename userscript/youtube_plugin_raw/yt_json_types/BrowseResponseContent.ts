type BrowseResponse={
	responseContext: ResponseContext;
	trackingParams: string;
	onResponseReceivedActions: ResponseReceivedAction[];
	contents?: BrowseContents;
	header?: BrowseHeader;
	topbar?: DesktopTopbarRenderer;
	frameworkUpdates?: EntityBatchUpdate;
	sidebar?: SettingsSidebarRenderer;
	observedStateTags?: StateTag[];
	cacheMetadata?: CacheMetadata;
};
type BrowseHeader=FeedTabbedHeaderRenderer|C4TabbedHeaderRenderer;