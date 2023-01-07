type WatchEndpointData={
	videoId: string;
	playlistId: `PL${string}`;
	index?: number;
	params: string;
	loggingContext: VssLoggingContext;
	watchEndpointSupportedOnesieConfig?: Html5PlaybackOnesieConfig;
};