
type D__TranscriptTrackSelectionEntity={
	key: string;
	selectedTrackIndex: 0;
	serializedParams: string;
};
type TranscriptTrackSelectionEntity={transcriptTrackSelectionEntity: D__TranscriptTrackSelectionEntity;};
type EntityMutationPayload=
|OfflineabilityEntity
|SubscriptionStateEntity
|PlaylistLoopStateEntity
|TranscriptTrackSelectionEntity
;

type TranscriptSearchBoxStateEntity={transcriptSearchBoxStateEntity: TranscriptSearchBoxState;};