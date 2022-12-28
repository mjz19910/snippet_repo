import {WatchEndpoint} from "../w/WatchEndpoint.js";

type WatchPlayerResponse={
	responseContext: {};
	playabilityStatus: {};
	streamingData: {};
	playerAds: {
		playerLegacyDesktopWatchAdsRenderer: {
			gutParams: {tag: string};
			playerAdParams: {
				enabledEngageTypes: string;
				showContentThumbnail:boolean;
			}
			showCompanion: true;
			showInstream: true;
			useGut: true;
		};
	}[];
	playbackTracking: {};
	captions: {};
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

type WatchContentResponse={
	currentVideoEndpoint: {};
	engagementPanels: {}[];
	frameworkUpdates: {
		entityBatchUpdate: {};
		elementUpdate: {};
	};
	onResponseReceivedEndpoints: {}[];
	pageVisualEffects: {}[];
	playerOverlays: {};
	responseContext: {};
	topbar: {};
	trackingParams: string;
};

export type PageResponseWatch={
	page: "watch";
	endpoint: WatchEndpoint;
	response: WatchContentResponse;
	playerResponse: WatchPlayerResponse;
	url: string;
};
