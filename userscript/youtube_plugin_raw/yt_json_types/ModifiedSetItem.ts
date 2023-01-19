type ModifiedSetItem={
	autoplayVideo: WatchPlaylistEndpoint;
	nextButtonVideo: WatchPlaylistEndpoint;
	previousButtonVideo?: WatchPlaylistEndpoint;
};

type WatchPlaylistEndpointData={
	playlistId: `RD${string}`;
	index: 13;
	params: string;
};

type WatchPlaylistEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	watchPlaylistEndpoint: WatchPlaylistEndpointData;
};