import {EntityMutationPayload} from "./EntityMutationPayload";


export type EntityMutationItem={
	entityKey: string;
	type: "ENTITY_MUTATION_TYPE_REPLACE";
	payload: EntityMutationPayload;
};
