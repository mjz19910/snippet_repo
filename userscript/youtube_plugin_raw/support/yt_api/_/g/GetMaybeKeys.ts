export type GetMaybeKeys<T>=
	T extends infer A?
	A extends {}? keyof A:
	keyof A:never;
export type MaybeKeysArray<T extends {}>=GetMaybeKeys<T> extends []?[]:GetMaybeKeys<T>[];
