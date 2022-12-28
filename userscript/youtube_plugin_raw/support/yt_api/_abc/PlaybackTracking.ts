
export type PlaybackTracking={
	atrUrl: {
		baseUrl: string;
		elapsedMediaTimeSeconds: number;
	};
	ptrackingUrl: {
		baseUrl: string;
	};
	qoeUrl: {
		baseUrl: string;
	};
	videostatsDefaultFlushIntervalSeconds: 40;
	videostatsDelayplayUrl: {
		baseUrl: string;
		elapsedMediaTimeSeconds: number;
	};
	videostatsPlaybackUrl: {
		baseUrl: string;
	};
	videostatsScheduledFlushWalltimeSeconds: [10,20,30];
	videostatsWatchtimeUrl: {
		baseUrl: string;
	};
};
