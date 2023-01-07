type WatchEndpointData={
	videoId: string;
	playlistId: `PL${string}`;
	params: string;
	loggingContext: VssLoggingContext;
	watchEndpointSupportedOnesieConfig: Html5PlaybackOnesieConfig;
};