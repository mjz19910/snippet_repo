type ExtractAllProperties<T extends {}>={
	[U in T_DistributedKeyof<T>]: Extract<T,{
		[_I in U]: any;
	}>[U];
} extends infer U? U[keyof U]:never;
