import {CaptionsRenderer} from "../_/c/CaptionsRenderer";
import {EndscreenRenderer} from "./EndscreenRenderer";
import {PlayerLegacyDesktopWatchAdsRenderer} from "./PlayerLegacyDesktopWatchAdsRenderer.js";
import {FrameworkUpdates} from "./FrameworkUpdates.js";
import {PaidContentOverlay} from "./PaidContentOverlay.js";
import {ResponseContext} from "./GeneralContext.js";

export type WatchResponsePlayer={
	responseContext: ResponseContext;
	playabilityStatus: {};
	streamingData: {};
	playerAds: PlayerLegacyDesktopWatchAdsRenderer[];
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
	annotations: {};
};
