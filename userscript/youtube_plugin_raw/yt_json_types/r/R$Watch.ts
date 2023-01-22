type R_Watch={
	responseContext: RC$ResponseContext;
	contents: R_TwoColumnWatchNextResults;
	currentVideoEndpoint: E_Watch;
	trackingParams: string;
	playerOverlays: R_PlayerOverlay;
	onResponseReceivedEndpoints: EI$ResponseReceived[];
	engagementPanels: R_EngagementPanelSectionList[];
	topbar: R_DesktopTopbar;
	pageVisualEffects: R_CinematicContainer[];
	frameworkUpdates: A_FrameworkUpdates;
};