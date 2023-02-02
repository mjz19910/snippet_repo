type CD_MusicLibraryStatusUpdate={
	libraryStatus: "MUSIC_LIBRARY_STATUS_IN_LIBRARY";
	addToLibraryFeedbackToken: string;
};
type CP_Tracking={clickTrackingParams: string;};
type CR_ContinuationItemsFor<T,U,V extends {continuationItems: any;}>={
	slot: U;
	targetId: T;
	continuationItems: V["continuationItems"];
};
type C_Innertube={innertubeCommand: E_YpcGetOfflineUpsell;};
type C_MusicLibraryStatusUpdate={musicLibraryStatusUpdateCommand: CD_MusicLibraryStatusUpdate;};
type C_RunAttestation={runAttestationCommand: D_RunAttestation;};