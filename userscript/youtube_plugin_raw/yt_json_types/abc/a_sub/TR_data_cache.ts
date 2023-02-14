type TR_data_cache<T extends keyof DT_DatabaseStoreTypes>={
	[U in T]: [U,DT_DatabaseStoreTypes[U][]];
}[T];
