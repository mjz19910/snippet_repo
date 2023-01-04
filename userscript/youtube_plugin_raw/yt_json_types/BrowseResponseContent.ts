type BrowseResponseContent={
	trackingParams: string;
	responseContext: ResponseContext;
	contents: BrowseContents;
	header: FeedTabbedHeaderRenderer;
	topbar: DesktopTopbarRenderer;
	onResponseReceivedActions: ResponseReceivedAction[];
	frameworkUpdates: EntityBatchUpdate;
	sidebar: SettingsSidebarRenderer;
	observedStateTags: StateTag[];
	cacheMetadata: CacheMetadata;
};