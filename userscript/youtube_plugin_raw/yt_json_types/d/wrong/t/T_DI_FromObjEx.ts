type T_DI_FromKeysOfObj<T,K extends string[]>=K extends [infer F extends keyof T,...infer R extends string[]]? [KV_T_AKZ<F,T_PrimitiveBox<T[F]>>,...T_DI_FromKeysOfObj<T,R>]:[];
type T_DI_FromObjEx<T extends {}>=T_DI_FromKeysOfObj<T,T_DistributedKeysOf_2<T>> extends {length: 1;}? T_DI_FromKeysOfObj<T,T_DistributedKeysOf_2<T>>[0]:KV_T_AKZ<"list",T_DI_FromKeysOfObj<T,T_DistributedKeysOf_2<T>>>;
