export type RemoveFirst<T extends string>=T extends `${string}${infer U}`? U:''
