type ModifiedSetItem={
	autoplayVideo: WatchPlaylistEndpoint;
	nextButtonVideo: WatchPlaylistEndpoint;
	previousButtonVideo?: WatchPlaylistEndpoint;
};
type E$WatchPlaylist={
	playlistId: `RD__{string}`;
	index: 13;
	params: string;
};
type WatchPlaylistEndpoint={
	clickTrackingParams: string;
	commandMetadata: G$Metadata;
	watchPlaylistEndpoint: E$WatchPlaylist;
};