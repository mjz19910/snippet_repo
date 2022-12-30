export type GetMaybeKeys<T>=T extends infer A? A extends {}? keyof A:keyof A:never;
