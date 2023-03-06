type T_StoreCacheType<T extends keyof DT_DatabaseStoreTypes>={
	[R in T]?: DA_CacheInfoType<R>;
};
