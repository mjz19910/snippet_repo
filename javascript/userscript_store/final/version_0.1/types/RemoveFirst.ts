export type RemoveFirst<T extends any[]> = T extends [any, ...infer U] ? U : [];
