export type UB_obj2<T extends T_DI_FromObj<any>>=T extends T_DI_FromObj<infer A extends {}>? A:never;
