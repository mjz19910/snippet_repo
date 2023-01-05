interface WatchNextResponse {
	onResponseReceivedEndpoints: YtEndpoint[];
	responseContext: ResponseContext;
	trackingParams: string;
	engagementPanels: EngagementPanel[];
	currentVideoEndpoint: YtEndpoint;
	contents?: TwoColumnWatchNextResults;
	playerOverlays: PlayerOverlayRenderer;
	topbar: DesktopTopbarRenderer;
	pageVisualEffects: CinematicContainerRenderer[];
	frameworkUpdates?: FrameworkUpdates;
}