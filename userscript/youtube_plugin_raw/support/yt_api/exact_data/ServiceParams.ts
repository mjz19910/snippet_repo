import {KVStore} from "../_/k/KVStore.js";

export type ServiceParams<T>={
	service: T;
	params: KVStore[];
};
