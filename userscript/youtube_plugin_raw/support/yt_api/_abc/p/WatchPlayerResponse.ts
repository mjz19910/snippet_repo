import {CaptionsRenderer} from "../../../../ShortsPlayerResponse.js";

export type WatchPlayerResponse={
	responseContext: {};
	playabilityStatus: {};
	streamingData: {};
	playerAds: {
		playerLegacyDesktopWatchAdsRenderer: {
			gutParams: {tag: string;};
			playerAdParams: {
				enabledEngageTypes: string;
				showContentThumbnail: boolean;
			};
			showCompanion: true;
			showInstream: true;
			useGut: true;
		};
	}[];
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
	adPlacements: {};
	frameworkUpdates: {};
};
