import {StreamingData} from "./StreamingData";
import {PlaybackTracking} from "./PlaybackTracking";
import {VideoDetails} from "./VideoDetails";
import {FrameworkUpdates} from "./FrameworkUpdates";

export type ShortsPlayerResponse={
	responseContext: {};
	playabilityStatus: {};
	streamingData: StreamingData;
	playbackTracking: PlaybackTracking;
	captions: {
		playerCaptionsTracklistRenderer: {};
	};
	videoDetails: VideoDetails;
	playerConfig: {};
	storyboards: {
		playerStoryboardSpecRenderer: {};
	};
	microformat: {
		playerMicroformatRenderer: {};
	};
	trackingParams: string;
	attestation: {
		playerAttestationRenderer: {};
	};
	videoQualityPromoSupportedRenderers: {
		videoQualityPromoRenderer: {};
	};
	frameworkUpdates: FrameworkUpdates;
};
