interface NextResponse {
	responseContext: RC$ResponseContext;
	contents?: NextResponseContents;
	continuationContents?: PlaylistPanelContinuation;
	currentVideoEndpoint?: E$WatchEndpoint;
	trackingParams: string;
	playerOverlays?: R$PlayerOverlay;
	videoReporting?: RT$ReportFormModal;
	queueContextParams?: string;
	onResponseReceivedEndpoints?: ResponseReceivedEndpointItem[];
	engagementPanels?: EngagementPanel[];
	topbar?: DesktopTopbarRenderer;
	pageVisualEffects?: CinematicContainerRenderer[];
	frameworkUpdates?: FrameworkUpdates;
};