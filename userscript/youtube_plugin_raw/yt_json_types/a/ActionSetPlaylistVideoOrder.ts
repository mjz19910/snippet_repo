type ActionSetPlaylistVideoOrder={
	title: string;
	selected: boolean;
	continuation?: {
		reloadContinuationData: {
			continuation: string;
			clickTrackingParams: string;
		};
	};
	serviceEndpoint?: E_Continuation;
	accessibility?: D__Accessibility;
	trackingParams: string;
};