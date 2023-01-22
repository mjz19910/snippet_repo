
type D_TranscriptTrackSelectionEntity={
	key: string;
	selectedTrackIndex: 0;
	serializedParams: string;
};
type TranscriptTrackSelectionEntity={transcriptTrackSelectionEntity: D_TranscriptTrackSelectionEntity;};
type EntityMutationPayload=
|OfflineabilityEntity
|SubscriptionStateEntity
|PlaylistLoopStateEntity
|TranscriptTrackSelectionEntity
;

type TranscriptSearchBoxStateEntity={transcriptSearchBoxStateEntity: TranscriptSearchBoxState;};