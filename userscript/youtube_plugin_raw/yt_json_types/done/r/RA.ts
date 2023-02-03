type RA_ReelDismissal={reelDismissalActionRenderer: AD_ReelDismissal;};
type RA_NotificationAction={notificationActionRenderer: AD_Notification;};
type DE_VE3832_Watch=
	|{videoId: string;}
	|{
		videoId: string;
		nofollow: true;
		watchEndpointSupportedOnesieConfig: R_Html5PlaybackOnesieConfig;
	}
	|{
		videoId: string;
		playlistId: `RD${string}`;
		index: 1;
		params: string;
		playerParams: string;
		loggingContext: D_VssLoggingContext;
		watchEndpointSupportedPrefetchConfig: D_PrefetchHintConfig;
	}
	|{
		videoId: string;
		playlistId: `RD${string}`;
		index: 2;
		loggingContext: R_VssLoggingContext;
	}
	|{
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
	}
	;
;