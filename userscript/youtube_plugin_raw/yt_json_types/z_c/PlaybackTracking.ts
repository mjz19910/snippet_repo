type D_PlaybackTracking={
	atrUrl: UrlAndElapsedMediaTime;
	ptrackingUrl: T$BaseUrl<never>;
	qoeUrl: T$BaseUrl<never>;
	videostatsDefaultFlushIntervalSeconds: 40;
	videostatsDelayplayUrl: UrlAndElapsedMediaTime;
	videostatsPlaybackUrl: T$BaseUrl<never>;
	videostatsScheduledFlushWalltimeSeconds: [10,20,30];
	videostatsWatchtimeUrl: T$BaseUrl<never>;
	youtubeRemarketingUrl?: T$BaseUrl<never>;
};