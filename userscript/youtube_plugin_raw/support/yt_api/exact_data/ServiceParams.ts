import {KVStore as KeyValueStore} from "../_abc/a/KVStore";

export type ServiceParams<T>={
	service: T;
	params: KeyValueStore[];
};
