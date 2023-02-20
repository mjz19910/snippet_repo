type T_MakeHandlers<T>={
	[U in keyof T]?: (x: T[U]) => void;
};
