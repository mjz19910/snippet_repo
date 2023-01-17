type WatchEndpointData={
	videoId: string;
	playlistId?: `PL${string}`|`RD${string}`;
	index?: number;
	playlistSetVideoId?: string;
	params?: string;
	continuePlayback?: true;
	loggingContext?: VssLoggingContext;
	watchEndpointSupportedOnesieConfig?: Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig?: PrefetchHintConfig;
	playerParams?: string;
};