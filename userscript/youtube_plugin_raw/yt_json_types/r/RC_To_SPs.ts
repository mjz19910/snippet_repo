type RC_To_SPs<T>={
	[U in keyof T]: {key: U; value: T[U];};
}[keyof T][];
