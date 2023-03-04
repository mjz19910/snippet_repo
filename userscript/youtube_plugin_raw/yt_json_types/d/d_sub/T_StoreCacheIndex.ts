type T_StoreCacheIndex<T extends keyof DT_DatabaseStoreTypes>={
	[R in T]?: [R,Map<string,number>];
};
