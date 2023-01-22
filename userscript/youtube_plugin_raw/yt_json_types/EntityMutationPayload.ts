
type D$TranscriptTrackSelectionEntity={
	key: string;
	selectedTrackIndex: 0;
	serializedParams: string;
};
type TranscriptTrackSelectionEntity={transcriptTrackSelectionEntity: D$TranscriptTrackSelectionEntity;};
type EntityMutationPayload=
|OfflineabilityEntity
|SubscriptionStateEntity
|PlaylistLoopStateEntity
|TranscriptTrackSelectionEntity
;

type TranscriptSearchBoxStateEntity={transcriptSearchBoxStateEntity: TranscriptSearchBoxState;};