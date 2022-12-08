declare global {
	type AnyOrRepeat2_1<T,U>=["T",AnyOrRepeat_1<T>]|["U",AnyOrRepeat_1<U>];
}

declare global {
	export type DualR_1=[true,AnyOrRepeat2_1<string,number>[]]|[false,AltPair<string,number>[]];
	export type TypeAOrTypeB_0=["string",string]|["number",number];
	export type DualRSimple=[true,(["string", AnyOrRepeat_1<string>] | ["number", AnyOrRepeat_1<number>])[]]|[false,TypeAOrTypeB_0[]];
}

export {};
