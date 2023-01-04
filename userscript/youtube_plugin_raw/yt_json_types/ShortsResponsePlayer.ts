type ShortsResponsePlayer={
	responseContext: {};
	playabilityStatus: {};
	streamingData: StreamingData;
	playbackTracking: PlaybackTracking;
	captions: CaptionsRenderer;
	videoDetails: VideoDetails;
	playerConfig: {};
	storyboards: PlayerStoryboardSpecRenderer;
	microformat: PlayerMicroformatRenderer;
	trackingParams: string;
	attestation: PlayerAttestationRenderer;
	videoQualityPromoSupportedRenderers: VideoQualityPromoRenderer;
	frameworkUpdates: FrameworkUpdates;
	cacheMetadata?: CacheMetadata;
};