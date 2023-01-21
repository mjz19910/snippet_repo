type ActionSetPlaylistVideoOrder={
	title: string;
	selected: boolean;
	continuation?: {
		reloadContinuationData: {
			continuation: string;
			clickTrackingParams: string;
		};
	};
	serviceEndpoint?: C$Continuation;
	accessibility?: A$Accessibility;
	trackingParams: string;
};