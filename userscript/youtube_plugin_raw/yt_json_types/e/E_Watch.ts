type E_Watch={
	clickTrackingParams?: string;
	commandMetadata?: M_VE3832;
	watchEndpoint: D_Watch;
};
type D_Watch={
	videoId: string;
	playlistId: "LL";
	index: number;
	playlistSetVideoId: string;
	params: string;
	startTimeSeconds: {};
	continuePlayback: {};
	loggingContext: R_VssLoggingContext;
	watchEndpointSupportedOnesieConfig: Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig: R_PrefetchHintConfig;
	playerParams: string;
	watchEndpointMusicSupportedConfigs: R_WatchEndpointMusicConfig;
	nofollow: {};
	playerExtraUrlParams: {
		key: "inline";
	}[];
};