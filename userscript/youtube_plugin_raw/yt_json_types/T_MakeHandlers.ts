type T_MakeHandlers<T>={
	[U in keyof T]: () => void;
};
