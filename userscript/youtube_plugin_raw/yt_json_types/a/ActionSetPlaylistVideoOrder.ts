type ActionSetPlaylistVideoOrder={
	title: string;
	selected: boolean;
	continuation?: {
		reloadContinuationData: {
			continuation: string;
			clickTrackingParams: string;
		};
	};
	serviceEndpoint?: E$Continuation;
	accessibility?: D__Accessibility;
	trackingParams: string;
};