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
	commandMetadata: G_CommandMetadata;
	watchPlaylistEndpoint: D_WatchPlaylist;
};