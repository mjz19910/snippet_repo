interface NextResponse {
	onResponseReceivedEndpoints: ResponseReceivedEndpointItem[];
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