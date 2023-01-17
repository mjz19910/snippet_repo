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
	watchEndpointMusicSupportedConfigs?: WatchEndpointMusicSupportedConfigs;
	playerParams?: string;
};
type WatchEndpointMusicSupportedConfigs=WatchEndpointMusicConfig;
type WatchEndpointMusicConfigData={
	hasPersistentPlaylistPanel: boolean;
	musicVideoType: "MUSIC_VIDEO_TYPE_ATV";
};

type WatchEndpointMusicConfig={
	watchEndpointMusicConfig: WatchEndpointMusicConfigData;
};