type R$Next={
	responseContext: RC$ResponseContext;
	contents?: G$NextContents;
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