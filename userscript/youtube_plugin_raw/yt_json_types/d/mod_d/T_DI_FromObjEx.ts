type T_DI_FromObjEx<T extends {}>=T_DistributedKeysOf_2<T> extends [infer F extends keyof T,...infer R]? {
	f: F; a: T[F]; r: R;
}:T_DistributedKeysOf_2<T> extends 0? []:T_DistributedKeysOf_2<T> extends 1? [DI_T_KV_Z<keyof T,T_PrimitiveBox<T[keyof T]>>]:{
	[U in keyof T]: DI_T_KV_Z<U,T_PrimitiveBox<T[U]>>;
}[keyof T];
