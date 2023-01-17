interface NextResponse {
	responseContext: ResponseContext;
	contents?: NextResponseContents;
	continuationContents: PlaylistPanelContinuation;
	currentVideoEndpoint?: WatchEndpoint;
	trackingParams: string;
	playerOverlays?: PlayerOverlayRenderer;
	videoReporting?: ReportFormModalRenderer;
	queueContextParams?: string;
	onResponseReceivedEndpoints?: ResponseReceivedEndpointItem[];
	engagementPanels?: EngagementPanel[];
	topbar?: DesktopTopbarRenderer;
	pageVisualEffects?: CinematicContainerRenderer[];
	frameworkUpdates?: FrameworkUpdates;
};