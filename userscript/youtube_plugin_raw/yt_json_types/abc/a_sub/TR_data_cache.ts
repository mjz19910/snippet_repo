type TR_data_cache<T extends keyof DT_DatabaseStoreTypes>={[U in T]: T_CacheInfoType<U>;}[T];
