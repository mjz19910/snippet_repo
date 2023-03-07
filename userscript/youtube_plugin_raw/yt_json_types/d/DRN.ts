type DRN_StorableItem=(x: "StorableItem") => "SI";
type DRN_KeyType<T>=(x: {type: T;}) => {d: T;};
type DRN_KeyIs<T>=(x: {is: T;}) => {a: T;};
type DEX_Renames<T extends ((x:any)=>any)[]>=T extends [infer J extends (x:any)=>any] ? [ReturnType<J>]:T extends [infer J extends (x:any)=>any,...infer R extends T[number][]] ? [ReturnType<J>,...DEX_Renames<R>]:never;