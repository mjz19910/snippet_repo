export type EntityMutationDelete={
	type: "ENTITY_MUTATION_TYPE_DELETE";
	entityKey: string;
	options: {
		persistenceOption: "ENTITY_PERSISTENCE_OPTION_INMEMORY_AND_PERSIST";
	};
};
