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
	observedStateTags: StateTagItem[];
}|{
	trackingParams: string;
	cacheMetadata: CacheMetadata;
};
