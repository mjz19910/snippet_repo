type ModifiedSetItem={
	autoplayVideo: E_WatchPlaylist;
	nextButtonVideo: E_WatchPlaylist;
	previousButtonVideo?: E_WatchPlaylist;
};
type D_WatchPlaylist={
	playlistId: `RD${string}`;
	index: 13;
	params: string;
};
type E_WatchPlaylist={
	clickTrackingParams: string;
	commandMetadata: {};
	watchPlaylistEndpoint: D_WatchPlaylist;
};