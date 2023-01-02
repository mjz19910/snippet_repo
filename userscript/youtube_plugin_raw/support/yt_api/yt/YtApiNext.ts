type YtApiNext={
	onResponseReceivedEndpoints: YtEndpoint[];
	responseContext: ResponseContext;
	trackingParams: string;
}|{
	onResponseReceivedEndpoints: YtEndpoint[];
	responseContext: ResponseContext;
	trackingParams: string;
	engagementPanels: {};
}|{
	onResponseReceivedEndpoints: YtEndpoint[];
	responseContext: ResponseContext;
	trackingParams: string;
	engagementPanels: {};
	currentVideoEndpoint: YtEndpoint;
	contents: {};
	playerOverlays: {};
	topbar: {};
	pageVisualEffects: {};
	frameworkUpdates: FrameworkUpdates;
};
