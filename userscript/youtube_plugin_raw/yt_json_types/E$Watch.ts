type E$Watch={
	videoId: string;
	nofollow?: boolean;
	playlistId?: `PL${string}`|`RD${string}`;
	index?: number;
	playlistSetVideoId?: string;
	params?: string;
	startTimeSeconds?: number;
	continuePlayback?: true;
	loggingContext?: VssLoggingContext;
	watchEndpointSupportedOnesieConfig?: Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig?: PrefetchHintConfig;
	watchEndpointMusicSupportedConfigs?: R_WatchEndpointMusicConfig;
	playerParams?: string;
};