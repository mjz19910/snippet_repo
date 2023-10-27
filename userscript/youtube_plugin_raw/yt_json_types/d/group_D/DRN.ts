// deno-lint-ignore-file
export type DRN_StorableItem=(x: "StorableItem") => "SI";
export type DRN_KeyType<T>=(x: {type: T;}) => {d: T;};
export type DRN_KeyIs<T>=(x: {is: T;}) => {a: T;};
export type DEX_Renames<T extends ((x:any)=>any)[]>=T extends [infer J extends (x:any)=>any] ? [ReturnType<J>]:T extends [infer J extends (x:any)=>any,...infer R extends T[number][]] ? [ReturnType<J>,...DEX_Renames<R>]:never;