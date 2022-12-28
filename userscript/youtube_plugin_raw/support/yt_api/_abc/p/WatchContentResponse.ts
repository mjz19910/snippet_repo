import {FrameworkUpdates} from "./FrameworkUpdates";

export type WatchContentResponse={
	currentVideoEndpoint: {};
	engagementPanels: {}[];
	frameworkUpdates: FrameworkUpdates;
	onResponseReceivedEndpoints: {}[];
	pageVisualEffects: {}[];
	playerOverlays: {};
	responseContext: {};
	topbar: {};
	trackingParams: string;
};
