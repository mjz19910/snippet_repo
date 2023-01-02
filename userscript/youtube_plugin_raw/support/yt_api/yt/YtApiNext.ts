type YtApiNext={
	onResponseReceivedEndpoints: YtEndpoint[];
	responseContext: ResponseContext;
	trackingParams: string;
}|{
	onResponseReceivedEndpoints: YtEndpoint[];
	responseContext: ResponseContext;
	trackingParams: string;
	engagementPanels: {};
};
