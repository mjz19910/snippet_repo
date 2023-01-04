type BrowseResponseContent={
	responseContext: ResponseContext;
	trackingParams: string;
	onResponseReceivedActions: ResponseReceivedAction[];
	contents?: BrowseContents;
	header?: FeedTabbedHeaderRenderer;
	topbar?: DesktopTopbarRenderer;
	frameworkUpdates?: EntityBatchUpdate;
	sidebar?: SettingsSidebarRenderer;
	observedStateTags?: StateTag[];
	cacheMetadata?: CacheMetadata;
};