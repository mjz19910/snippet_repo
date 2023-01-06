import {PlayabilityStatus} from "./PlayabilityStatus.js";
import {PlayerAttestationRenderer} from "./PlayerAttestationRenderer.js";

export interface PlayerResponse {
	responseContext: ResponseContext;
	playabilityStatus: PlayabilityStatus;
	streamingData?: StreamingData;
	heartbeatParams?: HeartbeatParams;
	playerAds?: DesktopWatchAdsRenderer[];
	playbackTracking?: PlaybackTracking;
	captions?: PlayerCaptionsTracklistRenderer;
	videoDetails?: VideoDetails;
	playerConfig?: PlayerConfig;
	storyboards?: PlayerStoryboardSpecRenderer|PlayerLiveStoryboardSpecRenderer;
	microformat?: PlayerMicroformatRenderer;
	cards?: CardCollectionRenderer;
	trackingParams: string;
	attestation?: PlayerAttestationRenderer;
	videoQualityPromoSupportedRenderers?: VideoQualityPromoRenderer;
	adPlacements?: {}[];
	frameworkUpdates: FrameworkUpdates;
	endscreen?: EndscreenRenderer;
	paidContentOverlay?: PaidContentOverlay;
	annotations?: PlayerAnnotationsExpandedRenderer[];
};