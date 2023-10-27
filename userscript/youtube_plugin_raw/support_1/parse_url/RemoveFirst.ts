// deno-lint-ignore-file
export type RemoveFirstA<T extends unknown[]>=T extends [unknown,...infer X]? X:never;
export type RemoveFirstB<T extends string>=T extends `${string}${infer C}`? C:never;
export type RemoveFirst<T>=T extends string ? RemoveFirstB<T>: T extends unknown[] ? RemoveFirstA<T>:never;