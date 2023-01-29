namespace NS_UnionToPartial {
	type ExtractValueFromUnion<T,U extends keyof T>=Extract<T,Record<U,any>>[U];
	type ExtractUnionCommon<T>={[U in T_DistributedKeyof<T>]: ExtractValueFromUnion<T,U>;};
	type UnionGetPartialPart<T>=Partial<Omit<ExtractUnionCommon<T>,keyof T>>;
	export type UnionToPartial<T>=Decay<Pick<T,keyof T extends string? keyof T:never>&UnionGetPartialPart<T>>;
}