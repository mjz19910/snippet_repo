
type D_TranscriptTrackSelectionEntity={
	key: string;
	selectedTrackIndex: 0;
	serializedParams: string;
};
type E_TranscriptTrackSelection={transcriptTrackSelectionEntity: D_TranscriptTrackSelectionEntity;};
type G_Entity=
|E_Offlineability
|E_SubscriptionState
|E_PlaylistLoopState
|E_TranscriptTrackSelection
|E_TranscriptSearchBoxState
;

type E_TranscriptSearchBoxState={transcriptSearchBoxStateEntity: D_TranscriptSearchBoxState;};