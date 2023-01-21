type WatchResponse={
	responseContext: ResponseContext;
	contents: A$TwoColumnWatchNextResults;
	currentVideoEndpoint: E$WatchEndpoint;
	trackingParams: string;
	playerOverlays: PlayerOverlayRenderer;
	onResponseReceivedEndpoints: ResponseReceivedEndpointItem[];
	engagementPanels: EngagementPanelSectionListRenderer[];
	topbar: DesktopTopbarRenderer;
	pageVisualEffects: CinematicContainerRenderer[];
	frameworkUpdates: FrameworkUpdates;
};