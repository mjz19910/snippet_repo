type D_PlaybackTracking={
	atrUrl: D_UrlAndElapsedMediaTime;
	ptrackingUrl: T_BaseUrl<never>;
	qoeUrl: T_BaseUrl<never>;
	videostatsDefaultFlushIntervalSeconds: 40;
	videostatsDelayplayUrl: D_UrlAndElapsedMediaTime;
	videostatsPlaybackUrl: T_BaseUrl<never>;
	videostatsScheduledFlushWalltimeSeconds: [10,20,30];
	videostatsWatchtimeUrl: T_BaseUrl<never>;
	youtubeRemarketingUrl?: T_BaseUrl<never>;
};