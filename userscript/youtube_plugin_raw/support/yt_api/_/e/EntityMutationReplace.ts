import {EntityMutationPayload} from "./EntityMutationPayload";

export type EntityMutationReplace={
	type: "ENTITY_MUTATION_TYPE_REPLACE";
	entityKey: string;
	payload: EntityMutationPayload;
};
