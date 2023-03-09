type T_DI_FromObj<T extends {}>=DIT_Item_AB<keyof T,T_PrimitiveBox<T[keyof T]>>;
type T_GP_FromObj<T extends T_DI_FromObj<any>>=T extends T_DI_FromObj<infer A>? A:never;
