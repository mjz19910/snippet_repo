import {EntityMutationPayload} from "../support/yt_api/_/e/EntityMutationPayload";

export type EntityMutationReplace={
	type: "ENTITY_MUTATION_TYPE_REPLACE";
	entityKey: string;
	payload: EntityMutationPayload;
};
