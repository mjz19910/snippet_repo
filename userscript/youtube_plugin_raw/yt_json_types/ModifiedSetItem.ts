type ModifiedSetItem={
	autoplayVideo: WatchPlaylistEndpoint;
	nextButtonVideo: WatchPlaylistEndpoint;
	previousButtonVideo?: WatchPlaylistEndpoint;
};

type E$WatchPlaylist={
	playlistId: `RD${string}`;
	index: 13;
	params: string;
};

type WatchPlaylistEndpoint={
	clickTrackingParams: string;
	commandMetadata: M$CommandMetadata;
	watchPlaylistEndpoint: E$WatchPlaylist;
};