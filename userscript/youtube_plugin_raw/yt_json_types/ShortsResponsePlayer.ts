type ShortsResponsePlayer={
	responseContext: {};
	playabilityStatus: {};
	streamingData: D$StreamingData;
	playbackTracking: D$PlaybackTracking;
	captions: R$PlayerCaptionsTracklist;
	videoDetails: D$VideoDetails;
	playerConfig: {};
	storyboards: R$PlayerStoryboardSpec;
	microformat: R$PlayerMicroformat;
	trackingParams: string;
	attestation: R$PlayerAttestation;
	videoQualityPromoSupportedRenderers: R$VideoQualityPromo;
	frameworkUpdates: A$FrameworkUpdates;
	cacheMetadata?: CacheMetadata;
};