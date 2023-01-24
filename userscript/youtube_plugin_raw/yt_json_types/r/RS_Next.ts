type RS_Next={
	responseContext: RC$ResponseContext;
	contents?: G_NextContents;
	continuationContents?: RC_PlaylistPanel;
	currentVideoEndpoint?: E_Watch;
	trackingParams: string;
	playerOverlays?: R_PlayerOverlay;
	videoReporting?: R_TODO_ReportFormModal;
	queueContextParams?: string;
	onResponseReceivedEndpoints?: GE_ResponseReceived[];
	engagementPanels?: R_EngagementPanelSectionList[];
	topbar?: R_DesktopTopbar;
	pageVisualEffects?: R_CinematicContainer[];
	frameworkUpdates?: A_FrameworkUpdates;
};