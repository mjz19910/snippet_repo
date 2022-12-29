import {StreamingData} from "../../../../StreamingData";
import {PlaybackTracking} from "../../../../PlaybackTracking";
import {VideoDetails} from "../../../../VideoDetails";
import {FrameworkUpdates} from "../../../../FrameworkUpdates";
import {CaptionsRenderer} from "../c/CaptionsRenderer";

export type ShortsResponsePlayer={
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
