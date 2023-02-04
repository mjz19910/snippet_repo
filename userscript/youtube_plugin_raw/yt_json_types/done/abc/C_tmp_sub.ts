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