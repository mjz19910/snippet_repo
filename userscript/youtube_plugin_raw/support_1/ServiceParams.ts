import {KVStore} from "../support_2/KVStore.js";

export type ServiceParams<T>={
	service: T;
	params: KVStore[];
};
