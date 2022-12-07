declare global {
	type AnyOrRepeat2_1<T,U>=["T",AnyOrRepeat_1<T>]|["U",AnyOrRepeat_1<U>];
}

declare global {
	export type DualR_m=[true,AnyOrRepeat2_1<string,number>[]]|[false,TypeAOrTypeB<string,number>[]];
	export type TypeAOrTypeBSimple=["string",string]|["number",number];
	export type DualRSimple=[true,(["string", AnyOrRepeat_1<string>] | ["number", AnyOrRepeat_1<number>])[]]|[false,TypeAOrTypeBSimple[]];
}

export {};
