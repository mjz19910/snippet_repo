export type FirstArr<T extends any[]> = T extends [infer U, ...any[]] ? U : [];
