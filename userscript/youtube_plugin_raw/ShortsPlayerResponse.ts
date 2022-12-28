import {StreamingData} from "./StreamingData";
import {PlaybackTracking} from "./PlaybackTracking";
import {VideoDetails} from "./VideoDetails";
import {FrameworkUpdates} from "./FrameworkUpdates";

export type CaptionsRenderer={
	playerCaptionsTracklistRenderer: {};
};

export type ShortsPlayerResponse={
	responseContext: {};
	playabilityStatus: {};
	streamingData: StreamingData;
	playbackTracking: PlaybackTracking;
	captions: CaptionsRenderer;
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
