type RA_ReelDismissal={reelDismissalActionRenderer: AD_ReelDismissal;};
type RA_NotificationAction={notificationActionRenderer: AD_Notification;};
type DE_VE3832_Watch={videoId: string;}|{
	videoId: string;
	playlistId: D_PlaylistId;
	index: number;
	playlistSetVideoId: string;
	params: string;
	startTimeSeconds: number;
	continuePlayback: false;
	loggingContext: R_VssLoggingContext;
	watchEndpointSupportedOnesieConfig: R_Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig: R_PrefetchHintConfig;
	playerParams: string;
	watchEndpointMusicSupportedConfigs: R_WatchEndpointMusicConfig;
	nofollow: boolean;
	playerExtraUrlParams: G_ExtraUrlParamItem[];
};
