import {TimestampWithNanos} from "../t/TimestampWithNanos.js";
import {EntityMutationItem} from "./EntityMutationItem";

export type EntityBatchUpdateData={
	mutations: EntityMutationItem[];
	timestamp: TimestampWithNanos;
};
