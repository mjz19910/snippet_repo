type T_GP_FromObj<T extends T_DI_FromObj<any>>=T extends T_DI_FromObj<infer A>? A:never;
