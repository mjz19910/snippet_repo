type TR_data_cache<T extends keyof DT_DatabaseStoreTypes>={[U in T]: DA_CacheInfoType<U>;}[T];
