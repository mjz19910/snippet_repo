type RefForEntityMutItem=NS$DiscriminatedEnums.EntityMutationItem;
type EntityMutationItem={
	entityKey: string;
	type: "ENTITY_MUTATION_TYPE_DELETE"|"ENTITY_MUTATION_TYPE_REPLACE";
	options?: EntityMutationOptions;
	payload?: EntityMutationPayload;
};