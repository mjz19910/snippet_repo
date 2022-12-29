import {FrameworkUpdates} from "../../_abc/f/FrameworkUpdates";

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
