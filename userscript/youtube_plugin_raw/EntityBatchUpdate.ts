import {TimestampWithNanos} from "./TimestampWithNanos";
import {EntityMutationItem} from "./EntityMutationItem";


export type EntityBatchUpdate={
	mutations: EntityMutationItem[];
	timestamp: TimestampWithNanos;
};
