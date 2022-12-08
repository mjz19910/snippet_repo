import {Constructor} from "./Constructor";

declare global {
	interface RecordKey<T> extends Constructor {
		key: T;
	}
}

export {};
