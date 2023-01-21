type BrowseMetadata=ChannelMetadataRenderer|PlaylistMetadataRenderer;

type BrowseResponse={
	responseContext: RC$ResponseContext;
	contents?: BrowseContents;
	continuationContents?: C$SectionList;
	header?: BrowseHeader;
	alerts?: AlertWithButtonRenderer[];
	metadata?: BrowseMetadata;
	trackingParams: string;
	topbar?: R$DesktopTopbar;
	microformat?: R$MicroformatDataRenderer;
	frameworkUpdates?: EntityBatchUpdate;
	// ?
	maxAgeStoreSeconds?: number;
	background?: MusicThumbnailRenderer;
	// ?
	onResponseReceivedActions?: ResponseReceivedAction[];
	sidebar?: BrowseSidebar;
	observedStateTags?: B$StateTag[];
	cacheMetadata?: CacheMetadata;
};