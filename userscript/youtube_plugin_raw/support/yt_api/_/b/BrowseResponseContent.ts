type BrowseResponseContent={
	responseContext?: ResponseContext;
	trackingParams: string;
	contents?: TwoColumnBrowseResultsRenderer;
	header?: FeedTabbedHeaderRenderer;
	topbar?: DesktopTopbarRenderer;
	sidebar?: SettingsSidebarRenderer;
	onResponseReceivedActions?: ResponseReceivedActionItem[];
	frameworkUpdates?: EntityBatchUpdate;
	observedStateTags?: StateTagItem[];
	cacheMetadata?: CacheMetadata;
};
