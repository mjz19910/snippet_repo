import {TimestampWithNanos} from "../t/TimestampWithNanos.js";
import {EntityMutationItem} from "./EntityMutationItem.js";

export type EntityBatchUpdateData={
	mutations: EntityMutationItem[];
	timestamp: TimestampWithNanos;
};
