export type OneKey<K extends string,V=any>={
	[P in K]: (Record<P,V>&Partial<Record<Exclude<K,P>,never>>) extends infer O? Decay<O>:never;
}[K];
