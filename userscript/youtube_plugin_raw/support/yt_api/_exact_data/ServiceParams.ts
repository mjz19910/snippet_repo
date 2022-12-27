import {KVStore as KeyValueStore} from "./KVStore";

export type ServiceParams<T>={
	service: T;
	params: KeyValueStore[];
};
