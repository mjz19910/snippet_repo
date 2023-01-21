type D$PlaybackTracking={
	atrUrl: UrlAndElapsedMediaTime;
	ptrackingUrl: BaseUrl<never>;
	qoeUrl: BaseUrl<never>;
	videostatsDefaultFlushIntervalSeconds: 40;
	videostatsDelayplayUrl: UrlAndElapsedMediaTime;
	videostatsPlaybackUrl: BaseUrl<never>;
	videostatsScheduledFlushWalltimeSeconds: [10,20,30];
	videostatsWatchtimeUrl: BaseUrl<never>;
	youtubeRemarketingUrl?: BaseUrl<never>;
};