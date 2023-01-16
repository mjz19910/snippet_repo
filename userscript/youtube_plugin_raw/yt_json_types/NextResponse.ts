interface NextResponse {
	responseContext: ResponseContext;
	contents?: TwoColumnWatchNextResults;
	currentVideoEndpoint: CurrentVideoEndpoint;
	trackingParams: string;
	playerOverlays: PlayerOverlayRenderer;
	onResponseReceivedEndpoints: ResponseReceivedEndpointItem[];
	engagementPanels: EngagementPanel[];
	topbar: DesktopTopbarRenderer;
	pageVisualEffects: CinematicContainerRenderer[];
	frameworkUpdates?: FrameworkUpdates;
};