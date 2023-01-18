type EntityMutationItem={
	entityKey: string;
	type: "ENTITY_MUTATION_TYPE_DELETE";
	options?: {
		persistenceOption: "ENTITY_PERSISTENCE_OPTION_INMEMORY_AND_PERSIST";
	};
	payload?: SubscriptionStateEntity|TranscriptTrackSelectionEntity;
};

type EntityMutationItemDescEnum=EntityMutationReplace|EntityMutationDelete