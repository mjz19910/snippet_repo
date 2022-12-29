import {GeneralContext} from "../../_abc/g/GeneralContext.js";
import {CaptionsRenderer} from "../c/CaptionsRenderer";
import {EndscreenRenderer} from "../e/EndscreenRenderer";
import {FrameworkUpdates} from "../../_abc/f/FrameworkUpdates.js";
import {PaidContentOverlay} from "../../_abc/p/PaidContentOverlay";
import {PlayerAdItem} from "../../_abc/p/PlayerAdItem";

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
