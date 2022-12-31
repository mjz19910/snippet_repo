import {CaptionsRenderer} from "../c/CaptionsRenderer.js";
import {FrameworkUpdates} from "../f/FrameworkUpdates.js";
import {PlaybackTracking} from "../p/PlaybackTracking.js";
import {VideoDetails} from "../v/VideoDetails.js";
import {CacheMetadata} from "./CacheMetadata";
import {StreamingData} from "./StreamingData.js";

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
	cacheMetadata?: CacheMetadata;
};
