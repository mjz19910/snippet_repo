type E_Watch={
	videoId: string;
	nofollow?: boolean;
	playlistId?: `PL${string}`|`RD__{string}`;
	index?: number;
	playlistSetVideoId?: string;
	params?: string;
	startTimeSeconds?: number;
	continuePlayback?: true;
	loggingContext?: R_VssLoggingContext;
	watchEndpointSupportedOnesieConfig?: Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig?: R_PrefetchHintConfig;
	watchEndpointMusicSupportedConfigs?: R_WatchEndpointMusicConfig;
	playerParams?: string;
	playerExtraUrlParams?: [{
		key: "inline";
		value: "1";
	}];
};