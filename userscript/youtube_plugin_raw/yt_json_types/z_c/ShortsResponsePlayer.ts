type ShortsResponsePlayer={
	responseContext: {};
	playabilityStatus: {};
	streamingData: DD_Streaming;
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
	cacheMetadata?: D_Cache_MD;
};