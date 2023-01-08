interface WatchNextResponse {
	onResponseReceivedEndpoints: ResponseReceivedEndpointItem[];
	responseContext: ResponseContext;
	trackingParams: string;
	engagementPanels: EngagementPanel[];
	currentVideoEndpoint: CurrentVideoEndpoint;
	contents?: TwoColumnWatchNextResults;
	playerOverlays: PlayerOverlayRenderer;
	topbar: DesktopTopbarRenderer;
	pageVisualEffects: CinematicContainerRenderer[];
	frameworkUpdates?: FrameworkUpdates;
};
type SignalServiceEndpoint={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: {
			sendPost: true;
		}
	};
	signalServiceEndpoint: SignalServiceEndpointData;
};

type ResponseReceivedEndpointItem=SignalServiceEndpoint;
type CurrentVideoEndpoint={};