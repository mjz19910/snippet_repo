type R$Watch={
	responseContext: RC$ResponseContext;
	contents: R$TwoColumnWatchNextResults;
	currentVideoEndpoint: E$WatchEndpoint;
	trackingParams: string;
	playerOverlays: R$PlayerOverlay;
	onResponseReceivedEndpoints: EI$ResponseReceived[];
	engagementPanels: R$EngagementPanelSectionList[];
	topbar: R$DesktopTopbar;
	pageVisualEffects: R$CinematicContainer[];
	frameworkUpdates: A_FrameworkUpdates;
};