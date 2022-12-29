import {KVStore} from "../_abc/a/KVStore";

export type UnwrapKvStore<T extends KVStore[]>={
	[U in keyof T]: {
		[V in T[U]['key']]: T[U]['value'];
	};
};
