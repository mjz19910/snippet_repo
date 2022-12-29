import {GeneralContext} from "../g/GeneralContext.js";
import {CaptionsRenderer} from "../c/CaptionsRenderer";
import {EndscreenRenderer} from "../e/EndscreenRenderer";
import {PlayerAdItem} from "../p/PlayerAdItem.js";
import {FrameworkUpdates} from "../FrameworkUpdates_0.js";
import {PaidContentOverlay} from "../p/PaidContentOverlay.js";

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
