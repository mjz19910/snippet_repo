type Constructor=new () => any;

declare global {
	interface RecordKey<T> extends Constructor {
		key: T;
	}
}

export {};
