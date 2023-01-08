
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

type TranscriptSearchBoxStateEntityData={
	key: string;
	isHidden: false;
};

type TranscriptSearchBoxStateEntity={
	transcriptSearchBoxStateEntity: TranscriptSearchBoxStateEntityData;
};