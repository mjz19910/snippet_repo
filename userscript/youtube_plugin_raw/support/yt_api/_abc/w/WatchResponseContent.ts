import {FrameworkUpdates} from "../p/FrameworkUpdates";

export type WatchResponseContent={
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
