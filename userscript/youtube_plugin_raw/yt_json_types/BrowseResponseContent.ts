type BrowseMetadata=R_ChannelMetadata|R_PlaylistMetadata;

type R_Browse={
	responseContext: RC$ResponseContext;
	contents?: BrowseContents;
	continuationContents?: C$SectionList;
	header?: BrowseHeader;
	alerts?: R_AlertWithButton[];
	metadata?: BrowseMetadata;
	trackingParams: string;
	topbar?: R_DesktopTopbar;
	microformat?: R_MicroformatData;
	frameworkUpdates?: R_EntityBatchUpdate;
	// ?
	maxAgeStoreSeconds?: number;
	background?: R_MusicThumbnail;
	// ?
	onResponseReceivedActions?: ResponseReceivedAction[];
	sidebar?: BrowseSidebar;
	observedStateTags?: B$StateTag[];
	cacheMetadata?: CacheMetadata;
};