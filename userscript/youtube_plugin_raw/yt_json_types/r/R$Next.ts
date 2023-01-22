type R_Next={
	responseContext: RC$ResponseContext;
	contents?: G_NextContents;
	continuationContents?: PlaylistPanelContinuation;
	currentVideoEndpoint?: E_Watch;
	trackingParams: string;
	playerOverlays?: R_PlayerOverlay;
	videoReporting?: RT$ReportFormModal;
	queueContextParams?: string;
	onResponseReceivedEndpoints?: EI$ResponseReceived[];
	engagementPanels?: EngagementPanel[];
	topbar?: R_DesktopTopbar;
	pageVisualEffects?: R_CinematicContainer[];
	frameworkUpdates?: A_FrameworkUpdates;
};