import {FrameworkUpdates} from "../f/FrameworkUpdates.js";
import {ResponseContext} from "../g/GeneralContext.js";

export type WatchResponseContent={
	currentVideoEndpoint: {};
	engagementPanels: {}[];
	frameworkUpdates: FrameworkUpdates;
	onResponseReceivedEndpoints: {}[];
	pageVisualEffects: {}[];
	playerOverlays: {};
	responseContext: ResponseContext;
	topbar: {};
	trackingParams: string;
};
