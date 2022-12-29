import {KVStore as KeyValueStore} from "../_/a/KVStore";

export type ServiceParams<T>={
	service: T;
	params: KeyValueStore[];
};
