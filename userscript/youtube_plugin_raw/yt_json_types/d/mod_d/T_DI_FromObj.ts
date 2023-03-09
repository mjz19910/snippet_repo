type T_DI_FromObj<T extends {}>={
	[U in keyof T]: DI_T_KV_Z<U,T_PrimitiveBox<T[U]>>
}[keyof T];
type T_GP_FromObj<T extends T_DI_FromObj<any>>=T extends T_DI_FromObj<infer A>? A:never;
type T_DI_FromObj2<T extends {}>=DI_T_KV_Z<keyof T,T[keyof T]>;
type UU2=T_DistributedKeysOf_2<T>;