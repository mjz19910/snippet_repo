type T_GP_FromObj<T extends T_DI_FromObj2<any>>=T extends T_DI_FromObj2<infer A>? A:never;
