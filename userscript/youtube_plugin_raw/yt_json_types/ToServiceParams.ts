export type ToServiceParams<T>={
	[U in keyof T]: {key: U; value: T[U];};
}[keyof T][];
