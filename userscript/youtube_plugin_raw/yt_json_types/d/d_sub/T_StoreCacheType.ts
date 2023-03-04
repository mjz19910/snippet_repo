type T_StoreCacheType<T extends keyof DT_DatabaseStoreTypes>={
	[R in T]?: T_CacheInfoType<R>;
};
