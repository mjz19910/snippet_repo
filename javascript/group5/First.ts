
export type First<T extends string>=T extends `${infer U}${string}`? U:''
