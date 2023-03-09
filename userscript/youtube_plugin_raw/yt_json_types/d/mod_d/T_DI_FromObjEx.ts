type T_DI_FromKeysOfObj<T,K extends string[]>=K extends [infer F extends keyof T,...infer R extends string[]]? [DI_T_KV_Z<F,T_PrimitiveBox<T[F]>>,...T_DI_FromKeysOfObj<T,R>]:[];
type T_DI_FromObjEx<T extends {}>=T_DI_FromKeysOfObj<T,T_DistributedKeysOf_2<T>> extends {length: 1;}? T_DI_FromKeysOfObj<T,T_DistributedKeysOf_2<T>>[0]:DI_T_KV_Z<"list",T_DI_FromKeysOfObj<T,T_DistributedKeysOf_2<T>>>;
