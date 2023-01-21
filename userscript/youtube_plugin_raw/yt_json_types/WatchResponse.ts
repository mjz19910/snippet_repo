type R$Watch={
	responseContext: RC$ResponseContext;
	contents: A$TwoColumnWatchNextResults;
	currentVideoEndpoint: E$WatchEndpoint;
	trackingParams: string;
	playerOverlays: R$PlayerOverlay;
	onResponseReceivedEndpoints: ResponseReceivedEndpointItem[];
	engagementPanels: EngagementPanelSectionListRenderer[];
	topbar: DesktopTopbarRenderer;
	pageVisualEffects: CinematicContainerRenderer[];
	frameworkUpdates: FrameworkUpdates;
};