type ModifiedSetItem={
	autoplayVideo: WatchPlaylistEndpoint;
	nextButtonVideo: WatchPlaylistEndpoint;
	previousButtonVideo?: WatchPlaylistEndpoint;
};
type D_WatchPlaylist={
	playlistId: `RD${string}`;
	index: 13;
	params: string;
};
type WatchPlaylistEndpoint={
	clickTrackingParams: string;
	commandMetadata: G_Metadata;
	watchPlaylistEndpoint: D_WatchPlaylist;
};