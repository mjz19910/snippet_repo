type D_ActionSetPlaylistVideoOrder={
	title: string;
	selected: boolean;
	continuation?: D_ReloadContinuation;
	serviceEndpoint?: C_Continuation;
	accessibility?: D_Accessibility;
	trackingParams: string;
};