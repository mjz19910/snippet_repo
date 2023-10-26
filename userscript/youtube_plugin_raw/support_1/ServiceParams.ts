import {KVStore} from "../support_2/KVStore.ts";

export type ServiceParams<T>={
	service: T;
	params: KVStore[];
};
