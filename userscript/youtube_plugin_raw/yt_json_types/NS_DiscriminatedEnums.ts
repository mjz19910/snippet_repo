type DE_MutationReplace={
	type: "ENTITY_MUTATION_TYPE_REPLACE";
	entityKey: string;
	payload: G_EY_Entity;
};
type EY_SubscriptionState={subscriptionStateEntity: D_SubscriptionState;};
type D_EY_TranscriptTrackSelectionEntity={key: string; selectedTrackIndex: 0; serializedParams: string;};
type EY_TranscriptTrackSelection={transcriptTrackSelectionEntity: D_EY_TranscriptTrackSelectionEntity;};
type EY_TranscriptSearchBoxState={transcriptSearchBoxStateEntity: D_TranscriptSearchBoxState;};
type G_EY_Entity=
	|EY_Offlineability
	|EY_SubscriptionState
	|EY_PlaylistLoopState
	|EY_TranscriptTrackSelection
	|EY_TranscriptSearchBoxState
	;
;
type DE_MutationDelete={
	type: "ENTITY_MUTATION_TYPE_DELETE";
	entityKey: string;
	options: DE_PersistenceOption;
};
namespace NS_DiscriminatedEnums {
	export type D_EntityMutationItem=DE_MutationReplace|DE_MutationDelete;
}