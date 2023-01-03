type BrowseResponseContent={
	trackingParams: string;
}|{
	responseContext: ResponseContext;
	contents: TwoColumnBrowseResultsRenderer;
	header: FeedTabbedHeaderRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	onResponseReceivedActions: ResponseReceivedAction[];
	frameworkUpdates: EntityBatchUpdate;
}|{
	trackingParams: string;
	sidebar: SettingsSidebarRenderer;
}|{
	trackingParams: string;
	observedStateTags: StateTag[];
}|{
	trackingParams: string;
	cacheMetadata: CacheMetadata;
};
