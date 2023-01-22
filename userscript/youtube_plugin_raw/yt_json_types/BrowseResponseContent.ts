type BrowseMetadata=R$ChannelMetadata|R$PlaylistMetadata;

type R$Browse={
	responseContext: RC$ResponseContext;
	contents?: BrowseContents;
	continuationContents?: C$SectionList;
	header?: BrowseHeader;
	alerts?: R$AlertWithButton[];
	metadata?: BrowseMetadata;
	trackingParams: string;
	topbar?: R$DesktopTopbar;
	microformat?: R$MicroformatData;
	frameworkUpdates?: R$EntityBatchUpdate;
	// ?
	maxAgeStoreSeconds?: number;
	background?: R$MusicThumbnail;
	// ?
	onResponseReceivedActions?: ResponseReceivedAction[];
	sidebar?: BrowseSidebar;
	observedStateTags?: B$StateTag[];
	cacheMetadata?: CacheMetadata;
};