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
}|{
	responseContext: ResponseContext;
	contents: TwoColumnBrowseResultsRenderer;
	header: FeedTabbedHeaderRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	observedStateTags: StateTag[];
}|{
	responseContext: ResponseContext;
	contents: TwoColumnBrowseResultsRenderer;
	trackingParams: string;
	topbar: DesktopTopbarRenderer;
	sidebar: SettingsSidebarRenderer;
};
