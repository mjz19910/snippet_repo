export type GP_DI_FromObj<T extends T_DI_FromObj<any>>=T extends T_DI_FromObj<infer A extends {}>? A:never;
