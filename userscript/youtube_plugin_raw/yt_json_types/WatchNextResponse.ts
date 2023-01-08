interface WatchNextResponse {
	onResponseReceivedEndpoints: ResponseReceivedEndpoints[];
	responseContext: ResponseContext;
	trackingParams: string;
	engagementPanels: EngagementPanel[];
	currentVideoEndpoint: CurrentVideoEndpoint;
	contents?: TwoColumnWatchNextResults;
	playerOverlays: PlayerOverlayRenderer;
	topbar: DesktopTopbarRenderer;
	pageVisualEffects: CinematicContainerRenderer[];
	frameworkUpdates?: FrameworkUpdates;
};
type ResponseReceivedEndpoints={};
type CurrentVideoEndpoint={};