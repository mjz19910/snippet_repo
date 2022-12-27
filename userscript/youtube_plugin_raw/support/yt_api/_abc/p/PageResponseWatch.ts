import {WatchEndpoint} from "../w/WatchEndpoint.js";

export type PageResponseWatch<T>={
	page: "watch";
	endpoint: WatchEndpoint<T>;
	response: {
		currentVideoEndpoint: never/*{}*/;
		engagementPanels: never; //{}[]
		frameworkUpdates: {entityBatchUpdate: never/*{}*/,elementUpdate: never/*{}*/;};
		onResponseReceivedEndpoints: never;//{}[];
		pageVisualEffects: never;//{}[];
		playerOverlays: never;//{}
		responseContext: never;//{}
		topbar: never;//{}
		trackingParams: string;
	};
	playerResponse: {
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
	url: string;
};
