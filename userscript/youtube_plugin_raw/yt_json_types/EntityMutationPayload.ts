
type TranscriptTrackSelectionEntityData={
	key: string;
	selectedTrackIndex: 0;
	serializedParams: string;
};

type TranscriptTrackSelectionEntity={
	transcriptTrackSelectionEntity: TranscriptTrackSelectionEntityData;
};

type EntityMutationPayload=
|OfflineabilityEntity
|SubscriptionStateEntity
|PlaylistLoopStateEntity
|TranscriptTrackSelectionEntity
;
