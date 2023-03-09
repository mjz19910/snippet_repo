export type T_UB_Obj<T>=T extends {z: [infer A];}? A:never;
