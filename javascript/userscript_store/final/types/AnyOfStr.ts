export type AnyOfStr<T extends string> = T extends `${infer U}${infer X}` ? X extends '' ? never : U | AnyOfStr<X> : '';
