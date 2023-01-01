type RemoveFirstA<T extends any[]>=T extends [any,...infer X]? X:never;
type RemoveFirstB<T extends string>=T extends `${string}${infer C}`? C:never;
type RemoveFirst<T>=T extends string ? RemoveFirstB<T>: T extends any[] ? RemoveFirstA<T>:never;