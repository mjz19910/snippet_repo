import {CaptionsRenderer} from "../../../../ShortsPlayerResponse.js";
import {EndscreenRenderer} from "./EndscreenRenderer";
import {FrameworkUpdates} from "./FrameworkUpdates.js";
import {PaidContentOverlay} from "./PaidContentOverlay";
import {PlayerAdItem} from "./PlayerAdItem";

export type WatchPlayerResponse={
	responseContext: {};
	playabilityStatus: {};
	streamingData: {};
	playerAds: PlayerAdItem[];
	playbackTracking: {};
	captions: CaptionsRenderer;
	videoDetails: {};
	playerConfig: {};
	storyboards: {};
	microformat: {};
	cards: {};
	trackingParams: {};
	attestation: {};
	videoQualityPromoSupportedRenderers: {};
	adPlacements: [];
	frameworkUpdates: FrameworkUpdates;
	endscreen?: EndscreenRenderer;
	paidContentOverlay?: PaidContentOverlay;
};
