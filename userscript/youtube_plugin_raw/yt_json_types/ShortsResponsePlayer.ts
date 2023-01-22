type ShortsResponsePlayer={
	responseContext: {};
	playabilityStatus: {};
	streamingData: D_StreamingData;
	playbackTracking: D_PlaybackTracking;
	captions: R_PlayerCaptionsTracklist;
	videoDetails: D_VideoDetails;
	playerConfig: {};
	storyboards: R_PlayerStoryboardSpec;
	microformat: R_PlayerMicroformat;
	trackingParams: string;
	attestation: R_PlayerAttestation;
	videoQualityPromoSupportedRenderers: R_VideoQualityPromo;
	frameworkUpdates: A_FrameworkUpdates;
	cacheMetadata?: CacheMetadata;
};