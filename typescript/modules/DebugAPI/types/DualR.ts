declare global {
	type AnyOrRepeat2<T,U>=["T",AnyOrRepeat<T>]|["U",AnyOrRepeat<U>];
}

declare global {
	export type DualR=[true,AnyOrRepeat2<string,number>[]]|[false,TypeAOrTypeB<string,number>[]];
	export type TypeAOrTypeBSimple=["string",string]|["number",number];
	export type DualRSimple=[true,(["string", AnyOrRepeat<string>] | ["number", AnyOrRepeat<number>])[]]|[false,TypeAOrTypeBSimple[]];
}
