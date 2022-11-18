type Constructor=new (...args: any[]) => any;

export interface RecordKey<T> extends Constructor {
	key: T;
};

declare global {
	interface RecordKeyG<T> extends RecordKey<T> {}
}