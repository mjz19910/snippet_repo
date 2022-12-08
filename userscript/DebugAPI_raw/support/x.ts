type Constructor=new () => any;

export interface RecordKey<T> extends Constructor {
	key: T;
}
