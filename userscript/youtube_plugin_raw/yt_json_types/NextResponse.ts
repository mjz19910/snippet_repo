interface NextResponse {
	responseContext: RC$ResponseContext;
	contents?: NextResponseContents;
	continuationContents?: PlaylistPanelContinuation;
	currentVideoEndpoint?: E$WatchEndpoint;
	trackingParams: string;
	playerOverlays?: R$PlayerOverlay;
	videoReporting?: RT$ReportFormModal;
	queueContextParams?: string;
	onResponseReceivedEndpoints?: EI$ResponseReceived[];
	engagementPanels?: EngagementPanel[];
	topbar?: R$DesktopTopbar;
	pageVisualEffects?: R$CinematicContainer[];
	frameworkUpdates?: A$FrameworkUpdates;
};