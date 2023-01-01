type PlayerMicroformatRenderer={
	playerMicroformatRenderer: {};
};

type playerAttestationRenderer={
	playerAttestationRenderer: {};
};

type playerStoryboardSpecRenderer={
	playerStoryboardSpecRenderer: {};
};

type videoQualityPromoRenderer={
	videoQualityPromoRenderer: {};
};

type ShortsResponsePlayer={
	responseContext: {};
	playabilityStatus: {};
	streamingData: StreamingData;
	playbackTracking: PlaybackTracking;
	captions: CaptionsRenderer;
	videoDetails: VideoDetails;
	playerConfig: {};
	storyboards: playerStoryboardSpecRenderer;
	microformat: PlayerMicroformatRenderer;
	trackingParams: string;
	attestation: playerAttestationRenderer;
	videoQualityPromoSupportedRenderers: videoQualityPromoRenderer;
	frameworkUpdates: FrameworkUpdates;
	cacheMetadata?: CacheMetadata;
};
