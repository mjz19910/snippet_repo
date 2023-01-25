type ExtractAllProperties<T extends {}>={
	[U in GetMaybeKeys<T>]: Extract<T,{
		[_I in U]: any;
	}>[U];
} extends infer U? U[keyof U]:never;
