type ShortsResponsePlayer={
	responseContext: {};
	playabilityStatus: {};
	streamingData: D__StreamingData;
	playbackTracking: D__PlaybackTracking;
	captions: R_PlayerCaptionsTracklist;
	videoDetails: D__VideoDetails;
	playerConfig: {};
	storyboards: R_PlayerStoryboardSpec;
	microformat: R_PlayerMicroformat;
	trackingParams: string;
	attestation: R_PlayerAttestation;
	videoQualityPromoSupportedRenderers: R_VideoQualityPromo;
	frameworkUpdates: A_FrameworkUpdates;
	cacheMetadata?: CacheMetadata;
};