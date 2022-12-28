import {WatchEndpoint} from "../w/WatchEndpoint.js";

type WatchPlayerResponse={
	responseContext: {};
	playabilityStatus: {};
	streamingData: {};
	playerAds: {};
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

export type PageResponseWatch<T>={
	page: "watch";
	endpoint: WatchEndpoint<T>;
	response: WatchContentResponse;
	playerResponse: WatchPlayerResponse;
	url: string;
};
