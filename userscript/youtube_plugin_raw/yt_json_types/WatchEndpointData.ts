type WatchEndpointData={
	videoId: string;
	playlistId: `PL${string}`|`RD${string}`;
	index?: number;
	params?: string;
	continuePlayback?: true;
	loggingContext: VssLoggingContext;
	watchEndpointSupportedOnesieConfig?: Html5PlaybackOnesieConfig;
};