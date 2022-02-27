export type AnyOfArr<T extends any[]> = T extends [infer U, ...infer X] ? X extends [] ? U : U | AnyOfArr<X> : never;
