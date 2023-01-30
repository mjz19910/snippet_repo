type D_AddToOfflineButtonState=T_EnumStr<
	"ADD_TO_OFFLINE_BUTTON_STATE",[
		"UNKNOWN",
		"ENABLED"
	][number]
>;

type G_EY_Entity=
	|EY_MacroMarkersList
	|EY_Offlineability
	|EY_TranscriptTrackSelection
	|S_EY_PlaylistLoop
	|S_EY_Subscription
	|S_EY_TranscriptSearchBox
	;
;
type EY_MacroMarkersList={macroMarkersListEntity: DS_EY_MacroMarkersList;};
type EY_Offlineability={offlineabilityEntity: D_EY_Offlineability;};
type S_EY_Subscription={subscriptionStateEntity: DS_EY_Subscription;};
type S_EY_PlaylistLoop={playlistLoopStateEntity: DS_EY_PlaylistLoop;};
type EY_TranscriptTrackSelection={transcriptTrackSelectionEntity: DS_EY_TranscriptTrackSelection;};
type S_EY_TranscriptSearchBox={transcriptSearchBoxStateEntity: DS_EY_TranscriptSearchBox;};
