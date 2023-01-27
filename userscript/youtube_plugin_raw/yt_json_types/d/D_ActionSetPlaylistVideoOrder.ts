type D_ActionSetPlaylistVideoOrder={
	title: string;
	selected: boolean;
	continuation?: CD_Reload;
	serviceEndpoint?: C_Continuation;
	accessibility?: D_Accessibility;
	trackingParams: string;
};