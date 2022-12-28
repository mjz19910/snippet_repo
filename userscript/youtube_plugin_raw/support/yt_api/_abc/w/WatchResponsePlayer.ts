import {GeneralContext} from "../g/GeneralContext.js";
import {CaptionsRenderer} from "../p/CaptionsRenderer";
import {EndscreenRenderer} from "../p/EndscreenRenderer";
import {FrameworkUpdates} from "../p/FrameworkUpdates.js";
import {PaidContentOverlay} from "../p/PaidContentOverlay";
import {PlayerAdItem} from "../p/PlayerAdItem";

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
