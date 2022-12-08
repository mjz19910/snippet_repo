type Constructor=new (...args: any[]) => any;

export interface RecordKeyL<T> extends Constructor {
	key: T;
}

declare global {
	interface RecordKey<T> extends RecordKeyL<T> {}
}
