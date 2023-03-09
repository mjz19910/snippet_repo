type T_DI_FromObj<T extends {}>=DI_T_KV_Z<keyof T,T_PrimitiveBox<T[keyof T]>>;
type T_GP_FromObj<T extends T_DI_FromObj<any>>=T extends T_DI_FromObj<infer A>? A:never;
type T_DI_FromObj2<T extends {}>=DI_T_KV_Z<keyof T,T[keyof T]>;
