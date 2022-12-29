import {GeneralContext} from "../GeneralContext.js";
import {CaptionsRenderer} from "../c/CaptionsRenderer";
import {EndscreenRenderer} from "../e/EndscreenRenderer";
import {PlayerAdItem} from "../PlayerAdItem.js";
import {FrameworkUpdates} from "../FrameworkUpdates.js";
import {PaidContentOverlay} from "../PaidContentOverlay.js";

export type WatchResponsePlayer={
	responseContext: GeneralContext;
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
	adPlacements?: [];
	frameworkUpdates: FrameworkUpdates;
	endscreen?: EndscreenRenderer;
	paidContentOverlay?: PaidContentOverlay;
};
