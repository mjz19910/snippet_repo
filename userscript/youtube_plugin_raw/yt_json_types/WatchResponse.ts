type WatchResponse={
	responseContext: ResponseContext;
	contents: TwoColumnWatchNextResults;
	currentVideoEndpoint: WatchEndpoint;
	trackingParams: string;
	playerOverlays: PlayerOverlayRenderer;
	onResponseReceivedEndpoints: SignalServiceEndpoint[];
	engagementPanels: EngagementPanelSectionListRenderer[];
	topbar: DesktopTopbarRenderer;
	pageVisualEffects: CinematicContainerRenderer[];
	frameworkUpdates: FrameworkUpdates;
};